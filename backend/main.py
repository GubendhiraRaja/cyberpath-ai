from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://cyberpath-ai-blue.vercel.app"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

@app.get("/")
def home():
    return {"status": "CyberPath AI Backend Running ✅"}

@app.post("/api/roadmap")
async def generate_roadmap(data: dict):
    try:
        from google import genai
        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        prompt = f"""
        Create a cybersecurity career roadmap.
        Target Role: {data.get('role', 'SOC Analyst')}
        Current Level: {data.get('experience', 'Beginner')}
        Available Time: {data.get('months', 6)} months
        Give a month-by-month plan with topics, labs, and certifications.
        """
        response = client.models.generate_content(
            model="gemini-2.0-flash-lite", contents=prompt
        )
        return {"roadmap": response.text}
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/interview")
async def mock_interview(data: dict):
    try:
        from google import genai
        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        prompt = f"""
        You are a technical interviewer for {data.get('role', 'SOC Analyst')} roles.
        Previous question: {data.get('question', 'Tell me about yourself')}
        Candidate answered: {data.get('answer', '')}
        1. Give brief feedback (2 sentences)
        2. Score it X/10
        3. Ask the next interview question
        """
        response = client.models.generate_content(
            model="gemini-2.0-flash-lite", contents=prompt
        )
        return {"reply": response.text}
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/resume")
async def analyze_resume(data: dict):
    try:
        from google import genai
        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        prompt = f"""
        Analyze this resume for a {data.get('role', 'SOC Analyst')} role:
        {data.get('resume_text', '')}
        Provide:
        1. ATS Score: X/100
        2. Missing keywords (list 5)
        3. Weak areas (list 3)
        4. Strong areas (list 2)
        5. Top 3 improvements
        """
        response = client.models.generate_content(
            model="gemini-2.0-flash-lite", contents=prompt
        )
        return {"feedback": response.text}
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/skillgap")
async def skill_gap(data: dict):
    try:
        from google import genai
        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        prompt = f"""
        Analyze skill gap for {data.get('role', 'SOC Analyst')} role.
        User current skills: {data.get('skills', [])}
        Return:
        1. Job Readiness: X%
        2. Skills you have that matter
        3. Critical missing skills (list 5)
        4. This week action plan (3 steps)
        """
        response = client.models.generate_content(
            model="gemini-2.0-flash-lite", contents=prompt
        )
        return {"analysis": response.text}
    except Exception as e:
        return {"error": str(e)}