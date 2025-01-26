import psycopg2
from psycopg2 import OperationalError

def connect_to_database():
    try:
        # Replace [YOUR-PASSWORD] with your actual password
        conn = psycopg2.connect(
            "postgresql://postgres:ANcfabJ3PZq4-3@@db.bhitganpvncxjirreced.supabase.co:5432/postgres"
        )
        print("Connection successful")
        conn.close()
    except OperationalError as e:
        print(f"Error while connecting to Supabase: {e}")

if __name__ == "__main__":
    connect_to_database()
