"""
Script to seed MongoDB with CV data from cv_data.json.
Run this to populate the database with CV data.
Usage: python seed_cv_data.py
"""

import asyncio
import os
import json
from pathlib import Path
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncMongoClient

load_dotenv()


async def seed_cv_data():
    """Connect to MongoDB and seed CV data from JSON file"""
    mongo_url = os.getenv("MONGO_URL")
    if not mongo_url:
        print("Error: MONGO_URL environment variable not set")
        return False

    # Load CV data from JSON file
    json_path = Path(__file__).parent / "cv_data.json"
    if not json_path.exists():
        print(f"Error: cv_data.json not found at {json_path}")
        return False

    try:
        with open(json_path, "r", encoding="utf-8") as f:
            cv_data = json.load(f)
        print(f"✓ Loaded CV data from {json_path}")
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in cv_data.json: {e}")
        return False
    except Exception as e:
        print(f"Error reading cv_data.json: {e}")
        return False

    client = AsyncMongoClient(mongo_url)
    db = client.cv_db
    
    try:
        # Delete existing CV data (optional, comment out if you want to keep previous versions)
        result = await db.cv_data.delete_many({})
        print(f"Deleted {result.deleted_count} existing CV data entries")
        
        # Insert new CV data
        result = await db.cv_data.insert_one(cv_data)
        print(f"✓ CV data successfully inserted with ID: {result.inserted_id}")
        return True
        
    except Exception as e:
        print(f"Error seeding CV data: {e}")
        return False
        
    finally:
        client.close()


if __name__ == "__main__":
    success = asyncio.run(seed_cv_data())
    exit(0 if success else 1)
