jest.mock('passport-google-oauth20', () => {
  return {
    Strategy: jest.fn(function Strategy(options, verify) {
      // The 'this' context refers to the strategy instance
      this.name = 'google'; // Set a name for the strategy

      // Mock the verify callback
      this.verify = verify;
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
