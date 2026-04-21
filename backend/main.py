import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import AsyncMongoClient

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URL = os.getenv("MONGO_URL")
client = AsyncMongoClient(MONGO_URL)
db = client.cv_db

# --- API Endpoints ---
@app.get("/")
async def root():
    return {"message": "FastAPI CV Backend is running!"}

@app.get("/api/profile")
async def get_profile():
    # Await the network operation using the native async driver
    profile_data = await db.profile.find_one({}, {"_id": "69e778f343c37cdc20de60a2"})
    
    if profile_data:
        return profile_data
        
    raise HTTPException(status_code=404, detail="Profile not found in database")