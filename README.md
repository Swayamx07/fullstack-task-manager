# Task Manager Backend

This is the backend service for the Task Manager application.
It provides a RESTful API to manage tasks with full CRUD functionality and persistent storage using MongoDB.

---

## 🚀 Features

- Create, read, update, and delete tasks (CRUD)
- Persistent storage with MongoDB
- Task metadata support:
  - Title
  - Description
  - Completion status
  - Created and updated timestamps
- Clean RESTful API design
- Environment-based configuration using `.env`
- CORS enabled for frontend integration

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

---

## 📂 Project Structure

backend/
├── models/
│   └── Task.js
├── index.js
├── package.json
├── .gitignore
└── README.md

---

## 📌 API Endpoints

### Health Check
GET /health  
Response:
"Server running"

---

### Create Task
POST /tasks  

Request body:
{
  "title": "Learn React",
  "description": "Complete basic React concepts"
}

---

### Get All Tasks
GET /tasks

---

### Update Task
PUT /tasks/:id  

Request body (any field can be updated):
{
  "title": "Learn Advanced React",
  "completed": true
}

---

### Delete Task
DELETE /tasks/:id

---

## 🗄️ Database Schema (Task)

{
  title: String,
  description: String,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date
}

Timestamps are automatically managed by Mongoose.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

MONGO_URI=mongodb://127.0.0.1:27017/taskmanager  
PORT=5000

.env is ignored by Git for security reasons.

---

## ▶️ How to Run Locally

1. Clone the repository
2. Install dependencies:
   npm install
3. Start MongoDB locally
4. Run the server:
   node index.js
5. Server runs at:
   http://localhost:5000

---

## 📈 Project Status

Phase 1 – Completed

- Full CRUD implemented
- MongoDB persistence
- Stable API
- Ready for deployment and authentication extension

---

## 👤 Author

Swayam Patil  
AIML Undergraduate | Full-Stack Developer  

---