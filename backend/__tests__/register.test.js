jest.mock('passport-google-oauth20', () => {
  return {
    Strategy: jest.fn((options, verify) => {
      // Mock the verify callback
      verify(null, { id: 'mock_id', displayName: 'Mock User' });
    }),
  };
});

const request = require('supertest');
const app = require('../server'); // Adjust the path according to your project structure

describe('GET /', () => {
  it('should return the homepage with status 200', async () => {
    const response = await request(server).get('/'); // Assuming your homepage route is '/'
    expect(response.status).toBe(200);
    // expect(response.text).toContain('Welcome to SENDMATE'); // Replace with actual content
  });
});
