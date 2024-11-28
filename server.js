const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const POSTS_FILE = 'posts.json';

app.use(cors());
app.use(bodyParser.json());

// Load comments from file
let comments = [];
function loadComments() {
    try {
        const data = fs.readFileSync(POSTS_FILE, 'utf8');
        comments = JSON.parse(data);
    } catch (error) {
        console.error('Error reading comments file:', error);
        comments = [];
    }
}

// Save comments to file
function saveComments() {
    try {
        fs.writeFileSync(POSTS_FILE, JSON.stringify(comments, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing to comments file:', error);
    }
}

// Initialize comments from the file
loadComments();

// Endpoint to get all comments
// Endpoint to get all comments in descending order
app.get('/comments', (req, res) => {
    res.json(comments.slice().reverse()); // Reverse a copy of the comments array
});

// Endpoint to post a new comment
app.post('/comments', (req, res) => {
    const newComment = req.body;
    if (!newComment.username || !newComment.text) {
        return res.status(400).json({ error: 'Username and text are required' });
    }
    comments.push(newComment);
    saveComments(); // Save updated comments to file
    res.status(201).json({ message: 'Comment added successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
