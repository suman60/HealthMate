const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// CORS Configuration
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"] }));

// Middleware
app.use(express.json());

const PYTHON_SERVER_URL = process.env.PYTHON_SERVER_URL || "http://127.0.0.1:5000"; // Python backend

// Handle chatbot response
app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await axios.post(`${PYTHON_SERVER_URL}/generate`, { message });
        res.json({ response: response.data.response });
    } catch (error) {
        console.error("Error in /chat:", error.message);
        res.status(500).json({ error: "Failed to get response from chatbot" });
    }
});

// Handle preflight requests
app.options("/chat", cors());

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
