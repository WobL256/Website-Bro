const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Hello, this is my HTTP server!');
});

// Start the server
app.listen(3100, '0.0.0.0', () => {
    console.log('HTTP server is running on http://yourdomain.com');
});
