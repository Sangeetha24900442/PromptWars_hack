const request = require('supertest');
const app = require('../server');

// Mock the GoogleGenerativeAI
jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => {
      return {
        getGenerativeModel: jest.fn().mockReturnValue({
          generateContent: jest.fn().mockResolvedValue({
            response: {
              text: () => 'This is a mocked AI response from CivicPath AI.'
            }
          })
        })
      };
    })
  };
});

describe('CivicPath AI API', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  // 1. GET /api/health
  it('GET /api/health -> 200, body has status "ok"', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('service', 'CivicPath AI');
  });

  // 2. POST /api/chat with empty message
  it('POST /api/chat with empty message -> 400', async () => {
    process.env.GEMINI_API_KEY = 'test_key';
    const res = await request(app).post('/api/chat').send({ message: '' });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe('Message is required');
  });

  // 3. POST /api/chat with message > 500 chars
  it('POST /api/chat with message > 500 chars -> 400', async () => {
    process.env.GEMINI_API_KEY = 'test_key';
    const longMessage = 'a'.repeat(501);
    const res = await request(app).post('/api/chat').send({ message: longMessage });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe('Message too long. Max 500 characters.');
  });

  // 4. POST /api/chat with missing GEMINI_API_KEY
  it('POST /api/chat with missing GEMINI_API_KEY -> 503', async () => {
    delete process.env.GEMINI_API_KEY;
    const res = await request(app).post('/api/chat').send({ message: 'Hello' });
    expect(res.statusCode).toEqual(503);
    expect(res.body.error).toBe('AI service unavailable');
  });

  // 5. POST /api/chat with valid message -> 200
  it('POST /api/chat with valid message -> 200 with reply field', async () => {
    process.env.GEMINI_API_KEY = 'test_key';
    const res = await request(app).post('/api/chat').send({ message: 'How do I register to vote?' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('reply', 'This is a mocked AI response from CivicPath AI.');
  });
});
