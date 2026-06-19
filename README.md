# MERN Todo App

A simple, fast, and fully functional full-stack Todo application. Built to practice CRUD operations, RESTful API creation, and connecting a React frontend with a Node/Express backend.

## Tech Stack

* **Frontend:** React.js (Vite), Tailwind CSS, Context API
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **API Calls:** Axios

## Features

* Create, Read, Update, and Delete (CRUD) tasks.
* Mark tasks as complete or incomplete (toggle status).
* Real-time UI updates using React state and Context API.
* Data persists in a MongoDB Atlas cloud database.

## How to Run This Project Locally

### 1. Clone the repository
```bash
git clone https://github.com/abdulhadi-m/MERN-todo.git
cd MERN-todo
```

### 2. Backend Setup
Open a terminal and navigate to the backend folder:
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory and add your MongoDB connection string:
```env
MONGO_URI=your_mongodb_connection_string_here
PORT=8081
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a second terminal and navigate to the frontend folder:
```bash
cd frontend
npm install
``` 
Start the Vite development server:
```bash
npm run dev
```

The app should now be running on `http://localhost:5173`.