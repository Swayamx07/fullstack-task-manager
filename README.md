# 🚀 TaskEasy — Task Manager Backend API

Backend service for **TaskEasy**, a production-ready task management application.
This API provides secure authentication and scalable task management with filtering, sorting, and pagination support.

Deployed using **Render** with **MongoDB Atlas** as the database.

---

## 🌐 Live API

Base URL:

```
https://fullstack-task-manager-tq89.onrender.com
```

Health Check:

```
GET /health
```

---

## ✨ Features

### 🔐 Authentication

* JWT-based authentication
* Secure login & registration
* Protected routes using middleware
* User-specific task isolation

### ✅ Task Management

* Create, read, update, delete tasks (CRUD)
* Status workflow system:

  * `todo`
  * `in-progress`
  * `completed`
* Priority levels:

  * low / medium / high
* Due date support
* User-owned tasks only

### ⚡ Advanced API Capabilities

* Server-side pagination
* Dynamic filtering
* Search functionality
* Sorting support
* Query validation
* RESTful API architecture

### 🛡️ Production Readiness

* MongoDB Atlas cloud database
* Environment-based configuration
* CORS configuration for deployed frontend
* Centralized error handling
* Secure password hashing (bcrypt)
* Token-based authorization

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB Atlas**
* **Mongoose**
* **JWT (jsonwebtoken)**
* **bcryptjs**
* **dotenv**
* **CORS**

---

## 📂 Project Structure

```
backend/
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── middleware/
│   └── auth.js
│
├── index.js
├── package.json
└── README.md
```

---

## 📌 API Endpoints

---

### 🩺 Health Check

```
GET /health
```

Response:

```
Server running
```

---

### 🔐 Authentication

#### Register User

```
POST /register
```

Request Body:

```json
{
  "name": "Swayam",
  "email": "user@email.com",
  "password": "123456"
}
```

---

#### Login

```
POST /login
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

### ✅ Tasks (Protected Routes)

All routes require:

```
Authorization: Bearer <token>
```

---

#### Create Task

```
POST /tasks
```

```json
{
  "title": "Learn Backend",
  "description": "Pagination implementation",
  "status": "todo",
  "priority": "high"
}
```

---

#### Get Tasks (Pagination + Filters)

```
GET /tasks
```

Query Parameters:

| Parameter | Example          | Description        |
| --------- | ---------------- | ------------------ |
| page      | `?page=2`        | Page number        |
| limit     | `?limit=10`      | Tasks per page     |
| status    | `?status=todo`   | Filter by status   |
| priority  | `?priority=high` | Filter by priority |
| search    | `?search=react`  | Search by title    |
| sort      | `?sort=dueDate`  | Sort field         |
| order     | `?order=asc`     | asc / desc         |

Response:

```json
{
  "tasks": [],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}
```

---

#### Update Task

```
PUT /tasks/:id
```

---

#### Delete Task

```
DELETE /tasks/:id
```

---

## 🗄️ Database Schema

### User

```js
{
  name: String,
  email: String,
  password: String
}
```

### Task

```js
{
  title: String,
  description: String,
  status: "todo" | "in-progress" | "completed",
  priority: "low" | "medium" | "high",
  dueDate: Date,
  user: ObjectId
}
```

Timestamps are automatically managed by Mongoose.

---

## ⚙️ Environment Variables

Create `.env` file:

```
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
PORT=5000
```

---

## ▶️ Run Locally

1. Clone repository

```
git clone <repo-url>
```

2. Install dependencies

```
npm install
```

3. Add `.env` file

4. Start server

```
node index.js
```

Server runs at:

```
http://localhost:5000
```

---

## 📈 Project Status

✅ Authentication system
✅ Protected APIs
✅ Pagination & filtering
✅ Production deployment
✅ MongoDB Atlas integration

**Current Stage:** Production-Ready Backend API

---

## 👨‍💻 Author

**Swayam Patil**
AIML Undergraduate | Full-Stack Developer

* MERN Stack Development
* Backend API Architecture
* Deployment & Cloud Integration

---
