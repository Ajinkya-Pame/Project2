const request = require('supertest');
const app = require('../server'); // Adjust path as needed to your Express app

describe('Registration Page Tests', () => {
    it('should return 200 status for GET /register', async () => {
        const res = await request(app).get('/register');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Register for Sendmate');
    });

    it('should show error for missing fields on POST /api/auth/register', async () => {
        const res = await request(app).post('/api/auth/register').send({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        expect(res.statusCode).toBe(400);
        expect(res.text).toContain('Error');
    });
});
