// tests/register.test.js

const request = require('supertest');
const app = require('../backend/server'); // Adjust the path to your main Express app file
const mongoose = require('mongoose');

describe('POST /api/auth/register', () => {
    beforeAll(async () => {
        // Connect to the test database (set this to your MongoDB URI for testing)
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        // Close the connection after tests are done
        await mongoose.connection.close();
    });

    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'Test@1234',
                confirmPassword: 'Test@1234',
            });

        expect(res.statusCode).toBe(302); // Assuming successful registration redirects to the login page
        expect(res.headers.location).toBe('/login');
    });

    it('should return 400 for existing email', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'existing@example.com',
                password: 'Test@1234',
                confirmPassword: 'Test@1234',
            });

        expect(res.statusCode).toBe(400);
        expect(res.text).toContain('User already exists');
    });

    it('should return 400 for mismatched passwords', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'testuser2@example.com',
                password: 'Test@1234',
                confirmPassword: 'Test@5678',
            });

        expect(res.statusCode).toBe(400);
        expect(res.text).toContain('Passwords do not match');
    });
});
