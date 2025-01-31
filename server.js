const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 5001;

// Use CORS for cross-origin requests and body parser for parsing JSON bodies
app.use(cors());
app.use(bodyParser.json());

// Define a POST route to accept user input
app.post('/generate', async (req, res) => {
    const user_input = req.body.input;

    if (!user_input) {
        return res.status(400).json({ error: 'Input is required' });
    }

    try {
        // Call the Python API
        const response = await axios.post('http://localhost:5000/generate', { input: user_input });
        res.json({ generated_text: response.data.generated_text });
    } catch (error) {
        res.status(500).json({ error: 'Error generating text' });
    }
});

app.listen(port, () => {
    console.log(`Node.js server running on http://localhost:${port}`);
});
