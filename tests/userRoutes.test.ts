import request from 'supertest';
import app from '../src/server'; // Adjust path if necessary

describe('User API', () => {

  let userId: string;

  it('should create a new user', async () => {
    const newUser = {
      username: 'JohnDoe',
      age: 30,
      hobbies: ['Reading', 'Gaming'],
    };

    const res = await request(app).post('/api/users').send(newUser);
    expect(res.status).toBe(201);
    expect(res.body.username).toBe('JohnDoe');
    expect(res.body.age).toBe(30);
    expect(res.body.hobbies).toEqual(['Reading', 'Gaming']);
    userId = res.body.id; // Save the user ID for later tests
  });

  it('should fetch the created user by ID', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.username).toBe('JohnDoe');
  });

  it('should update the user', async () => {
    const updatedUser = {
      username: 'JohnUpdatedDoe',
      age: 31,
      hobbies: ['Running', 'Swimming'],
    };

    const res = await request(app).put(`/api/users/${userId}`).send(updatedUser);
    expect(res.status).toBe(200);
    expect(res.body.username).toBe('JohnUpdatedDoe');
    expect(res.body.age).toBe(31);
    expect(res.body.hobbies).toEqual(['Running', 'Swimming']);
  });

  it('should delete the user', async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.status).toBe(204);
  });

  it('should return 404 for a non-existent user after deletion', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('User not found');
  });

});
