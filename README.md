# Task Tracker Application

A full-stack **Task Tracker Web Application** built using the **MERN Stack**. This project was developed as part of an assignment to demonstrate full-stack development skills including REST APIs, MongoDB integration, React fundamentals, real-time communication, reusable components, and deployment.

## 🚀 Live Demo

* **Frontend:** https://coll-edge-zeta.vercel.app/
* **Backend API:** https://colledge-production.up.railway.app

---

# 📌 Tech Stack

### Frontend

* React.js
* Axios
* Socket.IO Client
* React Icons
* Zod (Form Validation)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* Zod Validation

### Deployment

* Frontend → Vercel
* Backend → Railway
* Database → MongoDB Atlas

---

# ✨ Features

## ✅ Task Management (CRUD)

* Create Tasks
* View Tasks
* Update Tasks
* Delete Tasks

---

## ✅ Form Validation

* Implemented using **Zod**
* Prevents invalid submissions
* Displays validation errors instantly

---

## ✅ REST API

Fully implemented REST APIs including:

* Create Task
* Get All Tasks
* Update Task
* Delete Task

---

## ✅ MongoDB Integration

* Data stored permanently in MongoDB Atlas
* Mongoose used for database modeling
* Optimized MongoDB queries

---

## ✅ Real-Time Updates

Implemented using **Socket.IO**

Whenever a task is:

* Created
* Updated
* Deleted

all connected users receive live updates instantly without refreshing the page.

---

## ✅ Dynamic UI

* No page reload required
* State updates automatically
* Smooth user experience

---

## ✅ Sorting

Tasks can be sorted using MongoDB query operations.

Examples include:

* Latest First
* Oldest First

---

## ✅ Filtering

Implemented filtering using MongoDB query operators for efficient server-side filtering.

---

## ✅ Reusable Components

Created reusable components to improve maintainability.

Example:

* `PostForm` component used for creating and updating tasks.

---

## ✅ Responsive Design

Application is fully responsive across:

* Desktop
* Tablet
* Mobile

---

## ✅ Environment Variables

Sensitive configuration is stored using environment variables.

Examples:

Frontend

```env
NEXT_PUBLIC_ENDPOINT=your_backend_url
```

Backend

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URI=your_frontend_url
```

---

# 📂 Project Structure

```
Task-Tracker/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── login/
│   ├── utils/
│   └── pages.tsx
|   |__ types
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 📡 API Endpoints

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/posts     | Get All Tasks |
| POST   | /api/posts     | Create Task   |
| PUT    | /api/posts/:id | Update Task   |
| DELETE | /api/posts/:id | Delete Task   |

---

# 🎯 Assignment Requirements Checklist

✅ MERN Stack

✅ React Frontend

✅ Node.js + Express Backend

✅ MongoDB Integration

✅ CRUD Operations

✅ REST APIs

✅ Form Validation

✅ Responsive UI

✅ Dynamic Updates

✅ Public Deployment

---

# ⭐ Bonus Features Implemented

* Socket.IO Real-Time Notifications
* Server-side Sorting
* Server-side Filtering
* Reusable Components
* Environment Variables
* Zod Validation
* MongoDB Query Optimization
* Responsive UI

---

# 🚀 Future Improvements

* Authentication (JWT)
* User-specific Tasks
* Pagination
* Search Functionality
* Task Categories
* Drag & Drop Task Management
* Due Dates & Reminders

---

# 👨‍💻 Author

**Akash**

Built using the MERN Stack with a focus on clean architecture, reusable components, real-time communication, and scalable backend development.
