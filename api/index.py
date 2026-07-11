import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key=os.environ.get("AI_API_KEY"))

class GuideRequest(BaseModel):
    prompt: str

@app.post("/api/ai")
async def generate_guide(request_data: GuideRequest):
    if not request_data.prompt:
        raise HTTPException(status_code=400, detail="Empty prompt provided")

    try:
        system_instruction = (
            "You are Sarkaari-Setu+ AI, an expert digital assistant specialized in helping users understand "
            "Indian government schemes, certificate applications (like EWS, Income, Caste), and educational steps. "
            "Provide clean, direct, clear answers. Avoid long markdown formatting blocks that clutter smaller mobile screens. "
            "Simple say you don't know if you don't know about what the user is asking. "
            "Never code for anyone or talk random things. You are not any personal assistant, you are above than that. So please just tell people about the official works. "
            "Write in clean language, no bolds or any italics or any styles, leave proper spaces"
        )

        response = client.models.generate_content(
            model='gemini-3.1-flash-lite',
            contents=request_data.prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                # tools=[types.Tool(google_search=types.GoogleSearch())]
                # The line above will be out of comment only when our plan will be upgraded.
            )
        )
        return {"guide": response.text}
        
    except Exception as e:
        error_msg = str(e)
        if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
            raise HTTPException(
                status_code=429, 
                detail="Sarkaari-Setu+ AI is currently busy handling many requests. Please try again in 1 minute."
            )
        raise HTTPException(status_code=500, detail=error_msg)
