# PromptWars_hack

# CivicPath AI

**"Understand elections step by step"**

## Problem Statement
The election process, from registration to voting and result declaration, can often feel confusing and complex for citizens. There is a need for a reliable, neutral, and easy-to-understand educational resource.

## Features
- Neutral, non-partisan explanations of the election process.
- Step-by-step guidance on voter registration and voting day procedures.
- Responsive, modern card-based UI.
- Secure, with no personal data collection or tracking.

## Tech Stack
| Component | Technology |
|---|---|
| Frontend | React 18 + Vite 5, Pure CSS |
| Backend | Node.js + Express 4 |
| AI | @google/generative-ai (Gemini 1.5 Flash) |
| Testing | Jest + Supertest |
| Deployment | Google Cloud Run via Docker |

## Google Services Used
- **Gemini API:** Powers the AI assistant with `gemini-1.5-flash`.
- **Google Cloud Run:** Hosts the Dockerized application for scalability.

## Prerequisites
- Node.js 20+
- Docker (optional, for containerization)
- Gemini API Key

## Local Setup
1. Clone the repository.
2. Navigate to the client directory and install dependencies: `cd client && npm install`
3. Navigate to the server directory and install dependencies: `cd ../server && npm install`
4. Set up environment variables (see below).
5. Build the frontend: `cd ../client && npm run build`
6. Start the server: `cd ../server && npm start`
7. Access the app at `http://localhost:8080`

## Environment Variables
Create a `.env` file in the `server` directory.

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API Key |
| `PORT` | (Optional) Port for the server, defaults to 8080 |

## Testing
To run backend tests:
```bash
cd server
npm test
```

## Docker
**Build the image:**
```bash
docker build -t civicpath-ai .
```

**Run the container:**
```bash
docker run -p 8080:8080 -e GEMINI_API_KEY=your_api_key_here civicpath-ai
```

## Cloud Run Deployment
```bash
gcloud run deploy civicpath-ai \
  --source . \
  --port 8080 \
  --set-env-vars GEMINI_API_KEY="your_api_key" \
  --allow-unauthenticated
```

## Security Notes
- `GEMINI_API_KEY` is strictly read from the environment and never hardcoded.
- Strict backend input validation prevents malformed requests.
- CORS is configured to only allow expected origins.
- No user logs or personal data are retained.

## Accessibility Notes
- Semantic HTML and ARIA attributes used throughout.
- Color contrast meets WCAG 4.5:1 ratio requirements.
- Fully keyboard navigable with visible focus states.
- `aria-live` regions used for dynamic AI responses.

## Disclaimer
This assistant is for educational purposes only. It provides neutral civic information and does not support any political party or candidate. Always verify specific details from your official election authority.

## Links
- [GitHub Repo](#)
- [Live Demo](#)
