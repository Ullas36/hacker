# test_model.py
from model import save_to_json
from model import generate_roadmap

# Example user answers
user_answers = {
    "q0": "Backend Development",
    "q1": "Advanced",
    "q2": "5-10 hours",
    "q3": "Get a Job",
    "q4": "3 months",
    "q5": "JavaScript",
    "q6": "React",
    "q7": "No",
    "q8": "High",
    "q9": "Yes"
}

if __name__ == "__main__":
    # Generate roadmap based on user answers
    roadmap = generate_roadmap(user_answers)
    # Print the generated roadmap
    print("\n=== GENERATED ROADMAP ===\n")
    print(roadmap)

    print("\n=== ROADMAP SAVED TO JSON ===\n")
    # Load the saved JSON file to verify its content
    # print(save_to_json(roadmap_str=roadmap, answers=user_answers))

    
   

    
