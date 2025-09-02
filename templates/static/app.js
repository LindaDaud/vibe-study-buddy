document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const notesInput = document.getElementById('notesInput');
    const flashcardContainer = document.getElementById('flashcardContainer');
    const loadingDiv = document.getElementById('loading');

    // This is for local testing. In a real app, the API URL would be a full domain.
    const API_URL = '/api/generate';

    generateBtn.addEventListener('click', async () => {
        const notes = notesInput.value;
        if (notes.trim() === '') {
            alert('Please enter some study notes.');
            return;
        }

        flashcardContainer.innerHTML = '';
        loadingDiv.style.display = 'block';

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ notes }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const flashcards = await response.json();
            loadingDiv.style.display = 'none';

            if (flashcards.length === 0) {
                flashcardContainer.innerHTML = '<p>Could not generate flashcards. Please try with more detailed notes.</p>';
                return;
            }

            flashcards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.className = 'flashcard';
                cardElement.innerHTML = `
                    <div class="flashcard-inner">
                        <div class="flashcard-front">
                            <p>${card.question}</p>
                        </div>
                        <div class="flashcard-back">
                            <p>${card.answer}</p>
                        </div>
                    </div>
                `;
                
                // Add flip animation on click
                cardElement.addEventListener('click', () => {
                    cardElement.querySelector('.flashcard-inner').classList.toggle('flipped');
                });

                // Save to database
                saveFlashcard(card);
                
                flashcardContainer.appendChild(cardElement);
            });
        } catch (error) {
            console.error('Error:', error);
            loadingDiv.style.display = 'none';
            flashcardContainer.innerHTML = `<p>An error occurred: ${error.message}. Check the console for details.</p>`;
        }
    });

    // Function to save a flashcard to the database
    async function saveFlashcard(card) {
        try {
            const response = await fetch('/api/flashcards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(card),
            });
            const result = await response.json();
            if (!response.ok) {
                console.error('Failed to save flashcard:', result.error);
            } else {
                console.log('Flashcard saved successfully:', result.message);
            }
        } catch (error) {
            console.error('Error saving flashcard:', error);
        }
    }
});