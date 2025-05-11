from flask import Flask, request, jsonify
from model import generate_roadmap  # assuming you have this function

app = Flask(__name__)

@app.route('/api/roadmap', methods=['POST'])
def get_roadmap():
    data = request.get_json()
    selected_course = data.get('selectedCourse', '')
    
    # Use your ML model function here
    roadmap = generate_roadmap(selected_course)  # you can change this to your function name

    return jsonify({"roadmap": roadmap})

if __name__ == '__main__':
    app.run(debug=True)
