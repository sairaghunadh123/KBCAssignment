async function loadQuestion() {
    const response = await fetch('/question');
    const question = await response.json();
    document.getElementById('question').innerText = question.question;
}

document.getElementById('submit').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const answer = document.getElementById('answer').value;

    const response = await fetch('/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, answer })
    });

    const result = await response.json();

    // Clear the answer input field after submitting
    document.getElementById('answer').value = '';

    if (result.correct) {
        document.getElementById('result').innerText = `Congratulations, ${result.name}! You got 10 points. Your total score is ${result.score}.`;

        if (result.nextQuestion) {
            document.getElementById('question').innerText = `Next Question: ${result.nextQuestion.question}`;
        } else {
            document.getElementById('result').innerText += " You've completed the game!";
        }
    } else {
        alert("Wrong answer! Try again.");
    }
});

// Load the first question on page load
loadQuestion();
