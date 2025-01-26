from fastapi import FastAPI, WebSocket
import asyncio
from typing import Dict, List
import json
from websockets.exceptions import ConnectionClosed

import models, crud, database

app = FastAPI()

active_connections: Dict[str, List[WebSocket]] = {}

@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI Chat App!"}

@app.get("/favicon.ico")
async def favicon():
    return {"message": "Favicon not found"}  # or serve the file

@app.websocket("/messages/{room_id}")
async def websocket_endpoint(room_id: str, websocket: WebSocket):
    db = database.SessionLocal()
    room = crud.get_room(db, room_id)
    db.close()
    if not room:
        await websocket.close()
        return

    if room_id not in active_connections:
        active_connections[room_id] = []
    active_connections[room_id].append(websocket)

    try:
        await websocket.accept()

        while True:
            message = await websocket.receive_text()

            message_data = {
                "room_id": room_id,
                "message": message,
            }
            json_message = json.dumps(message_data)

            for connection in active_connections[room_id]:
                if connection != websocket:
                    await connection.send_text(json_message)

    except:
        pass

@app.post("/rooms")
def create_room_handler(room: models.Room):
    db = database.SessionLocal()
    db_room = crud.create_room(db, room)
    db.close()
    return {"message": f"Room Id: {db_room.name} is created"}

@app.get("/rooms/{room_id}")
def get_room_handler(room_id: str):
    db = database.SessionLocal()
    room = crud.get_room(db, room_id)
    db.close()
    if room:
        return {"id": room.id, "name": room.name}
    return {"message": "Room not found"}

