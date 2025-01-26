from fastapi import FastAPI, WebSocket, BackgroundTasks, WebSocketDisconnect
import asyncio
from typing import Dict, List
import json
import httpx
from twilio.rest import Client
import os
import logging
from sqlalchemy import Column, String, Boolean, ARRAY
from dotenv import load_dotenv
from pydantic import BaseModel
# Load environment variables from .env file
load_dotenv()

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()



# Twilio Configuration
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')
class LoginRequest(BaseModel):
    patient_id: str
app = FastAPI()
active_sms_tasks = {}
active_connections: dict = {}  # Mapping room_id -> list of websocket connections
user_connections: dict = {}    # Mapping websocket connection -> user name

logger = logging.getLogger(__name__)


# Helper function to get data from the external API
async def get_queue_status():
    async with httpx.AsyncClient() as client:
        response = await client.get("https://ifem-award-mchacks-2025.onrender.com/api/v1/queue")
        return response.json() if response.status_code == 200 else {}

async def get_current_stats():
    async with httpx.AsyncClient() as client:
        response = await client.get("https://ifem-award-mchacks-2025.onrender.com/api/v1/stats/current")
        return response.json() if response.status_code == 200 else {}

async def get_patient_details(patient_id: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://ifem-award-mchacks-2025.onrender.com/api/v1/patient/{patient_id}")
            if response.status_code == 200:
                return response.json()
            else:
                return {"error": "Failed to fetch patient details", "status_code": response.status_code}
    except httpx.RequestError as e:
        return {"error": f"An error occurred: {e}"}

# Twilio SMS sending function
async def send_sms_update(phone_numbers: List[str], message: str):
    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

    for number in phone_numbers:
        try:
            message_sent = client.messages.create(
                to=number,
                from_=TWILIO_PHONE_NUMBER,
                body=message
            )
            logger.info(f"Message sent to {number}: {message_sent.sid}")
        except Exception as e:
            logger.error(f"Error sending message to {number}: {e}")


# Background task to send SMS updates every 1 minute
async def send_periodic_sms_update(patient_id:str):
    phone_numbers = [""]  # List of phone numbers to send updates to
    while True:
        try:
            # Fetch the queue status and patient details
            patient_data = await get_patient_details(patient_id)
            

            # Fetch the patient's details
        
            # Average wait times by triage category
            average_wait_times = {
                "1": 2,
                "2": 20,
                "3": 75,
                "4": 150,
                "5": 240
            }

            # Construct the message
            message = f"Hospital Status Update for Patient {patient_data['id']}:\n\n"
            message += f"Arrival Time: {patient_data['arrival_time']}\n"
            message += f"Current Phase: {patient_data['status']['current_phase']}\n"
            message += f"Queue Position (Global): {patient_data['queue_position']['global']}\n"
            message += f"Triage Category: {patient_data['triage_category']}\n"
            message += f"Time Elapsed: {patient_data['time_elapsed']} seconds\n"

            # Average wait time based on triage category
            avg_wait_time = average_wait_times.get(str(patient_data['triage_category']), 'N/A')
            message += f"Estimated Wait Time (Triage {patient_data['triage_category']}): {avg_wait_time} minutes\n"

            # Display investigations status
            investigations = patient_data['status']['investigations']
            message += f"Imaging Status: {investigations['imaging']}\n"
            message += f"Labs Status: {investigations['labs']}\n"

            # Send SMS updates to the list of phone numbers
            await send_sms_update(phone_numbers, message)

            # Wait for 60 seconds before sending the next update
            await asyncio.sleep(360)

        except Exception as e:
            logger.error(f"Error in send_periodic_sms_update: {e}")
            await asyncio.sleep(60)  # Retry after 60 seconds in case of an error



@app.on_event("startup")
async def start_periodic_sms_updates():
    asyncio.create_task(send_periodic_sms_update(patient_id="anon_2142"))


