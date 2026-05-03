# CivicPath AI - Walkthrough

This document explains how the CivicPath AI project satisfies the prompt's criteria.

## 1. Instructions Followed
The project adheres strictly to the provided instructions, using exactly the specified tech stack (React 18, Vite 5, Node.js, Express 4, Gemini 1.5 Flash, Jest, Supertest, pure CSS). The folder structure matches the requirements perfectly, and all specified sections, questions, text, and disclaimers are present exactly as requested.

## 2. Code Quality and Structure
The codebase is clean, well-organized, and follows standard conventions. The frontend is a structured React application with clear separation of concerns in `App.jsx`, utilizing modern React hooks. The backend uses Express with clearly defined routes and error handling in `server.js`. The pure CSS implementation maintains consistency with variables and responsive design principles.

## 3. Security Measures
Security is prioritized by ensuring the `GEMINI_API_KEY` is only read from `process.env` and never exposed or hardcoded. The `.env` file is explicitly ignored in `.gitignore` and `.dockerignore`. The backend validates all inputs before invoking the Gemini API and prevents error stack traces from leaking to the client. The application is stateless and does not record or store any personal data.

## 4. Efficiency
The project is highly efficient, avoiding bloated frameworks like Tailwind or Bootstrap in favor of tailored, performant pure CSS. The choice of `gemini-1.5-flash` ensures rapid responses from the AI. The Dockerfile uses multi-stage builds to keep the final image minimal, excluding development dependencies and source files.

## 5. Testing
The Jest and Supertest suite comprehensively covers the backend API. It tests the health check endpoint, validates that empty or overly long messages are rejected with `400 Bad Request`, ensures a `503 Service Unavailable` is returned if the API key is missing, and mocks the Gemini API to verify successful chat responses without making real network calls.

## 6. Accessibility
Accessibility is a core feature, utilizing semantic HTML elements (`header`, `main`, `section`, `footer`). `aria-live="polite"` is used on the chat response area to notify screen readers of new content. Forms have proper labels, buttons are clearly descriptive, color contrast exceeds the 4.5:1 requirement, and all interactive elements have visible focus states.

## 7. Google Services
The application heavily utilizes Google's ecosystem. It integrates `@google/generative-ai` to power the core educational assistant, providing neutral and accurate civic information. Furthermore, the project is fully Dockerized and optimized for deployment on Google Cloud Run, allowing it to scale automatically while securely managing the Gemini API key through Cloud Run environment variables.
