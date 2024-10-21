Node.js CRUD API with Horizontal Scaling

Overview
This project is a simple CRUD API implemented using **Node.js** and **TypeScript** with an in-memory database. The application supports basic CRUD operations on a list of users and is horizontally scalable using Node.js **Cluster API**. Multiple instances of the server run on different ports to handle requests in parallel.

Features:
- **CRUD Operations** on users: Create, Read, Update, Delete.
- **Horizontal Scaling** using Node.js Cluster API.
- Error handling for invalid requests, non-existing routes, and server errors.
- **TypeScript** for type safety and scalability.

---

Step 1: Clone the Repository
git clone https://github.com/your-username/node-crud-api.git
cd node-crud-api

Step 2: Install Dependencies
npm install

Step 3: Set Up Environment Variables
Create a .env file in the root of the project with the following content:
PORT=8000
The PORT variable sets the base port for the application.

Running the Application
Development Mode (with hot reload)
For development, you can run the application using ts-node-dev for automatic reloading on code changes:

npm run start:dev

The server will start on the port specified in .env (e.g., 8000).

Production Mode
To run the application in production:
First, build the TypeScript code:

npm run build

Then, start the server:

npm run start

Horizontal Scaling (Cluster Mode)
To run the application with multiple instances (based on available CPUs) using the Cluster API:

npm run start:multi

This will start multiple instances of the server, each on a unique port (e.g., 8001, 8002, 8003, etc.).

API Usage
Base URL
The base URL for all API requests is http://localhost:8000/api/users (or other ports in cluster mode).

Endpoints
GET /api/users - Retrieve all users

Response: 200 OK, returns an array of user objects.

curl http://localhost:8000/api/users
GET /api/users/{userId} - Retrieve a specific user by ID

Response:
200 OK for a valid user ID.
400 Bad Request for invalid UUID.
404 Not Found if user is not found.

curl http://localhost:8000/api/users/<userId>
POST /api/users - Create a new user

Request Body:

{
  "username": "JohnDoe",
  "age": 30,
  "hobbies": ["Reading", "Gaming"]
}
Response:
201 Created for a successful request.
400 Bad Request if required fields are missing or invalid.

curl -X POST http://localhost:8000/api/users \
-H "Content-Type: application/json" \
-d '{"username": "JohnDoe", "age": 30, "hobbies": ["Reading", "Gaming"]}'
PUT /api/users/{userId} - Update an existing user

Request Body:

{
  "username": "UpdatedName",
  "age": 35,
  "hobbies": ["Running"]
}

Response:
200 OK for a successful update.
400 Bad Request for invalid user ID or request body.
404 Not Found if user is not found.


curl -X PUT http://localhost:8000/api/users/<userId> \
-H "Content-Type: application/json" \
-d '{"username": "UpdatedName", "age": 35, "hobbies": ["Running"]}'
DELETE /api/users/{userId} - Delete a user

Response:
204 No Content for a successful deletion.
400 Bad Request for invalid user ID.
404 Not Found if user is not found.

curl -X DELETE http://localhost:8000/api/users/<userId>
Error Handling
400 Bad Request for invalid request bodies or invalid UUIDs.
404 Not Found for non-existing resources or users.
500 Internal Server Error for unhandled server-side issues.
Running Tests
This project includes tests for the API endpoints. To run the tests:

npm run test
The test suite covers scenarios for creating, retrieving, updating, and deleting users, as well as error handling.
Horizontal Scaling (Advanced Feature)
The application supports horizontal scaling via Node.js Cluster API. In cluster mode, multiple workers are created based on available CPUs. Requests can be distributed across these workers.

To run the app with multiple worker instances:

npm run start:multi
This will fork worker processes, each listening on different ports (e.g., 8001, 8002, etc.). The cluster auto-restarts workers in case of failures.


