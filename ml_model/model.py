import os
import json
from dotenv import load_dotenv
from groq import Groq
load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def create_prompt(answers: dict) -> str:
    prompt = f"""
You are a career counselor and expert learning roadmap planner.

User details:
- Domain of Interest: {answers['q0']}
- Skill Level: {answers['q1']} 
- Study Time Weekly: {answers['q2']} hours
- Final Goal: {answers['q3']}
- Timeline: {answers['q4']}
- Preferred Language: {answers['q5']}
- Preferred Framework: {answers['q6']}
- Prior Programming Knowledge: {answers['q7']}
- Project Enthusiasm Level: {answers['q8']}
- Wants Certification: {answers['q9']}

Task:
Create a customized, detailed, and realistic learning roadmap based only on the main domain: {answers['q0']}.

Use these guidelines:
- Expand the topic deeply: cover not just fundamentals but also intermediate and advanced areas.
- Break the content into **at least  to 7 modules**, each focusing on different key concepts or specializations.
- Ensure each module contains 4-5 well-planned chapters.
- If skill level is Beginner, add basics; if Intermediate or Advanced, move faster into deep topics.
- Adjust chapter density based on Study Time ({answers['q2']} hours/week).
- Respect the Timeline ({answers['q4']}).
- Prioritize {answers['q0']} topics 70% or more.
- Mini-projects matching Project Enthusiasm ({answers['q8']}).
- Programming knowledge basics only if needed ({answers['q7']}).
- Focus on using {answers['q5']} and {answers['q6']}.
- Include certification preparation if {answers['q9']} is Yes.

Respond ONLY in JSON format structured like:

{{
  "roadmap": [
    {{
      "module": "Module Name",
      "chapters": [
        {{
          "chapter_title": "Chapter Name",
          "duration": "1-2 weeks",
          "description": "Brief description of the chapter",
          "goal": "Goal Description",
          "resources": ["Resource1 URL", "Resource2 URL", "Resource3 URL"],
          "mini_project": "Mini Project Idea"
        }}
      ]
    }}
  ]
}}

Important Instructions:
- No extra text. Only JSON.
- Logical, progressive structure: Beginner → Intermediate → Advanced.
- High-quality YouTube, docs, and books as resources.
- Every chapter must end with a mini-project.
"""
    return prompt




def generate_roadmap(answers: dict) -> str:
    prompt = create_prompt(answers)
    response = client.chat.completions.create(
        model="gemma2-9b-it",   # You can also try "llama3-70b-8192"
        messages=[{
            "role": "system", 
            "content": "You are an expert roadmap builder."
        },{
            "role": "user", 
            "content": prompt
        }],
        temperature=0.5,
        max_tokens=4096
    )
    roadmap = response.choices[0].message.content
    
    # Call save_to_json with answers to dynamically set the filename
    save_to_json(roadmap, answers)
    
    return roadmap


def save_to_json(roadmap_str: str, answers: dict):
    try:
        # Create a valid filename based on answers['q0']
        filename = f"{answers['q0'].replace(' ', '_').lower()}.json"
        
        # Load the roadmap JSON structure from the string
        roadmap_json = json.loads(roadmap_str)
        
        # Save the JSON to a file with the dynamic filename
        with open(filename, 'w', encoding='UTF_8') as file:
            json.dump(roadmap_json, file, indent=4, ensure_ascii=False)
        
        print(f"The roadmap is saved in the file successfully: {filename}")

    except json.JSONDecodeError as e:
        print('Failed to load the json file:', e)
