import { useEffect, useState } from 'react'
import axios from 'axios'
import '../src/index.css'
import { TodoProvider } from './Context/TodoContext'
import { TodoForm, TodoItems } from './Components'

function App() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // bringing todos frm server
  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL);
      if (response.data.success) {
        setTodos(response.data.data);
      }
    } catch (err) {
      setError("Failed to fetch tasks. Please try again.");
      console.error("Error fetching todos:", err);
    } finally {
      setIsLoading(false);
    }
  }

  // adding new todos
  const addTodo = async (todo) => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, { data: todo });
      if (response.data.success) {
        setTodos((prev) => [response.data.data, ...prev]);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }

  // updating todo
  const updateTodo = async (id, updatedTodo) => {
    try {
      // 🚨 FIX: Added /${id} to the URL
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, { data: updatedTodo });
      if (response.data.success) {
        setTodos((prev) => prev.map((prevTodo) => (prevTodo._id === id ? response.data.data : prevTodo)));
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  // del todo by id
  const deleteTodo = async (id) => {
    try {
      // 🚨 FIX: Added /${id} to the URL
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
      if (response.data.success) {
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  // todo complete or not
  const toggleComplete = async (id) => {
    const todoToToggle = todos.find((t) => t._id === id);
    if (!todoToToggle) return;

    try {
      // 🚨 FIX: Added /${id} to the URL
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, {
        data: { isCompleted: !todoToToggle.isCompleted }
      });
      if (response.data.success) {
        setTodos((prev) => prev.map((prevTodo) => (prevTodo._id === id ? response.data.data : prevTodo)));
      }
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          
          {/* Error Message UI */}
          {error && (
            <div className="bg-red-500 text-white px-4 py-2 rounded mb-4 text-center shadow-lg">
              {error}
            </div>
          )}

          {/* Loading Spinner/Text UI */}
          {isLoading && (
            <div className="text-center text-yellow-300 font-semibold mb-4 animate-pulse">
              ⏳ Loading tasks...
            </div>
          )}

          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {
              todos.map((todo) => (
              <div key={todo._id} className="w-full">
                <TodoItems todo={todo}/>
              </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App