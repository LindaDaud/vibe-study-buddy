# 🎓 AI Study Buddy - Interactive Professor

## Project Summary
AI Study Buddy is a hackathon project built for the Vibe Coding 4-3-2 Hackathon. It is designed to help students learn more effectively by instantly generating interactive flashcards from their study notes. By leveraging the power of AI, it transforms passive reading into an active learning experience, addressing the urgent challenge of effective study methods.

## Problem Statement
Students often spend hours manually creating study materials like flashcards from their notes. This process is time-consuming and inefficient. Our solution directly addresses this pain point by automating the creation of interactive, personalized flashcards, freeing up students to focus on learning rather than preparation.

## Tech Stack
* **Frontend:** HTML5, CSS3, JavaScript (with state management for UI updates)
* **Backend:** Python with the Flask framework
* **Database:** MySQL
* **AI:** Hugging Face Question-Answering API
* **Monetization:** IntaSend Payments

## Key Features
* **Flashcard Generation:** Paste your notes and get a set of unique flashcards instantly.
* **Interactive UI:** Click to flip flashcards and reveal the answer.
* **Persistence:** Flashcards are saved to a MySQL database for future review.
* **Monetization:** A simple, non-intrusive payment option via IntaSend to support the project.

## How to Run the Project Locally
1.  **Clone the Repository:**
    ```bash
    git clone [your-github-repo-link]
    cd vibe-study-buddy
    ```
2.  **Set up the Backend:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    pip install Flask Flask-MySQLdb transformers
    ```
3.  **Database Setup:**
    * Ensure MySQL is running on your machine.
    * Log in to your MySQL server and run the following commands to create the database and table:
    ```sql
    CREATE DATABASE study_buddy;
    USE study_buddy;
    CREATE TABLE flashcards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```
4.  **Run the Flask Server:**
    * Create a `.env` file or set environment variables for your MySQL credentials.
    * Run the application:
    ```bash
    export FLASK_APP=app.py
    flask run
    ```
5.  **View in Browser:**
    Open your web browser and navigate to `http://127.0.0.1:5000`.

## Team Members
* **Linda Daud:** - daudlinda805@gmail.com
* **Charles Ojem:** - charojem@gmail.com
---
**Happy coding!** 🚀
