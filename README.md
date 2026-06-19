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

## 🧠 Challenges Faced & Solutions

1. **CORS Errors & API Integration:** Initially faced `ECONNREFUSED` and CORS issues while connecting the Vite React frontend with the Express backend. 
**Solution:** Configured the `cors` middleware properly in Express and ensured Axios requests matched the exact backend port.
2. **Vite Silent Blank Screen:** Encountered an issue where the React app rendered a blank white screen with no console errors due to mismatched export/import names and cached files. 
**Solution:** Fixed component file names (e.g., `TodoForms` to `TodoForm`), corrected `index.js` exports, and did a hard restart of the Vite development server to clear the cache.
3. **State Synchronization:** Handling the difference between the local state `id` and MongoDB's auto-generated `_id`. 
**Solution:** Refactored the frontend state management and Context API to strictly use `_id` and `isCompleted` to match the Mongoose schema perfectly.