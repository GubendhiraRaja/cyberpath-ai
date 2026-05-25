from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from dotenv import load_dotenv
import os

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():
    return {"status": "CyberPath AI Backend Running ✅"}

@app.post("/api/roadmap")
async def generate_roadmap(data: dict):
    prompt = f"""
    Create a detailed cybersecurity career roadmap.
    Target Role: {data.get('role', 'SOC Analyst')}
    Current Level: {data.get('experience', 'Beginner')}
    Available Time: {data.get('months', 6)} months
    
    Give a month-by-month plan with:
    - Topics to study
    - Labs to practice
    - Certifications to target
    Format it clearly.
    """
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    return {"roadmap": response.text}

@app.post("/api/interview")
async def mock_interview(data: dict):
    prompt = f"""
    You are a professional technical interviewer for {data.get('role', 'SOC Analyst')} roles.
    Previous question: {data.get('question', 'Tell me about yourself')}
    Candidate answered: {data.get('answer', '')}
    
    1. Give brief feedback on their answer (2 sentences)
    2. Score it: X/10
    3. Ask the next relevant interview question
    Be encouraging and professional.
    """
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    return {"reply": response.text}

@app.post("/api/resume")
async def analyze_resume(data: dict):
    prompt = f"""
    Analyze this resume for a {data.get('role', 'SOC Analyst')} cybersecurity role:
    
    {data.get('resume_text', '')}
    
    Provide:
    1. ATS Score: X/100
    2. Missing keywords (list 5)
    3. Weak areas (list 3)
    4. Strong areas (list 2)
    5. Top 3 specific improvements
    Be direct and actionable.
    """
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    return {"feedback": response.text}

@app.post("/api/skillgap")
async def skill_gap(data: dict):
    prompt = f"""
    Analyze skill gap for {data.get('role', 'SOC Analyst')} role.
    User current skills: {data.get('skills', [])}
    
    Return:
    1. Job Readiness: X%
    2. Skills you have that matter (list)
    3. Critical missing skills (list 5)
    4. This week's action plan (3 steps)
    Be specific with tool names.
    """
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    return {"analysis": response.text}