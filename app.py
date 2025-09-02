import os
from flask import Flask, request, jsonify, render_template
from flask_mysqldb import MySQL
from transformers import pipeline

app = Flask(__name__)

# Database configuration
app.config['MYSQL_HOST'] = os.getenv('DB_HOST', 'localhost')
app.config['MYSQL_USER'] = os.getenv('DB_USER', 'root')
app.config['MYSQL_PASSWORD'] = os.getenv('DB_PASSWORD', 'your_mysql_password')  # Use env vars in production!
app.config['MYSQL_DB'] = os.getenv('DB_NAME', 'study_buddy')

mysql = MySQL(app)

# Hugging Face Question-Answering Pipeline
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/generate', methods=['POST'])
def generate_flashcards():
    data = request.json
    text_content = data.get('notes')
    if not text_content:
        return jsonify({'error': 'No text content provided'}), 400

    try:
        questions_to_generate = 5
        generated_data = []
        chunk_size = 200
        chunks = [text_content[i:i + chunk_size] for i in range(0, len(text_content), chunk_size)]
        for chunk in chunks[:questions_to_generate]:
            qa_result = qa_pipeline(question="What is this about?", context=chunk)
            question_text = f"Based on the following context, what is the main point: '{chunk[:50]}...'"
            answer_text = qa_result['answer']
            generated_data.append({'question': question_text, 'answer': answer_text})
        return jsonify(generated_data)
    except Exception as e:
        app.logger.error(f"Error generating flashcards: {e}")
        return jsonify({'error': 'An internal error occurred'}), 500

@app.route('/api/flashcards', methods=['POST'])
def save_flashcard():
    data = request.json
    question = data.get('question')
    answer = data.get('answer')
    user_id = 1
    if not all([question, answer]):
        return jsonify({'error': 'Question and answer are required'}), 400
    try:
        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO flashcards (user_id, question, answer) VALUES (%s, %s, %s)",
            (user_id, question, answer)
        )
        conn.commit()
        cursor.close()
        return jsonify({'message': 'Flashcard saved successfully'}), 201
    except Exception as e:
        app.logger.error(f"Error saving flashcard: {e}")
        return jsonify({'error': 'An internal database error occurred'}), 500

if __name__ == '__main__':
    app.run(debug=True)