const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

const app = express();
const PORT = process.env.PORT || 3000;

const questions = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "Which planet is known as the Red Planet?", answer: "Mars" },
    { question: "What is the largest mammal in the world?", answer: "Blue Whale" },
    { question: "What is the currency of Japan?", answer: "Yen" },
    { question: "What is the smallest prime number?", answer: "2" },
    { question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare" },
    { question: "What is the tallest mountain in the world?", answer: "Mount Everest" },
    { question: "What is the boiling point of water?", answer: "100" },
    { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
    { question: "What is the largest ocean on Earth?", answer: "Pacific Ocean" },
];

let players = {};
let currentQuestionIndex = 0;
let score = 0;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from public directory

app.get('/question', (req, res) => {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        res.json(question);
    } else {
        res.json({ message: "No more questions available." });
    }
});

app.post('/answer', (req, res) => {
    const { name, answer } = req.body;
    const question = questions[currentQuestionIndex]; // Get the current question

    if (answer === question.answer) {
        players[name] = true;
        score += 10; // Add points for correct answer
        currentQuestionIndex++; // Move to the next question

        if (currentQuestionIndex < questions.length) {
            res.json({
                correct: true,
                name,
                score,
                nextQuestion: questions[currentQuestionIndex]
            });
        } else {
            res.json({
                correct: true,
                name,
                score,
                message: "Congratulations! You've completed the game!"
            });
        }
    } else {
        res.json({ correct: false });
    }
});

app.get('/qr', async (req, res) => {
    //const url = 'http://localhost:' + PORT + '/';
    const url = `http://${req.headers.host}/`
    try {
        const qrCode = await QRCode.toDataURL(url);
        res.send(`<img src="${qrCode}"/>`);
    } catch (err) {
        console.error(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
