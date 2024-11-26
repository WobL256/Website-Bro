const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 25595;

// Use an in-memory array for comments (for simplicity)
// In a real-world app, use a database like MongoDB or PostgreSQL
let comments = [];

app.use(cors());
app.use(bodyParser.json());

// Endpoint to fetch all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Endpoint to add a new comment
app.post('/comments', (req, res) => {
    const { username, text } = req.body;
    if (username && text) {
        comments.push({ username, text });
        res.status(201).json({ message: 'Comment added successfully' });
    } else {
        res.status(400).json({ message: 'Username and text are required' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
