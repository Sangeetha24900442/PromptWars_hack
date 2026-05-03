const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Serve React client
let clientPath = path.join(__dirname, 'public');
if (!fs.existsSync(clientPath)) {
  clientPath = path.join(__dirname, '../client/dist');
}
app.use(express.static(clientPath));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'CivicPath AI' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ error: 'AI service unavailable' });
    }

    const { message } = req.body;

    if (message === undefined || message === null || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid input' });
    }

    if (message.length > 500) {
      return res.status(400).json({ error: 'Message too long. Max 500 characters.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-flash-latest',
      systemInstruction: "You are CivicPath AI, a neutral and non-partisan civic education assistant. Your job is to explain election processes, voter registration, voting timelines, voting day procedures, vote counting, and result declaration in simple, clear, step-by-step language suitable for all citizens. You must never support, oppose, or mention any political party, candidate, or ideology. You must never collect or ask for personal data. Always recommend that users verify specific dates, laws, and local rules from their official election authority website."
    });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    // Do not expose stack traces to client
    console.error('Chat error:', error.message);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Only start the server if this file is run directly (not in tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
