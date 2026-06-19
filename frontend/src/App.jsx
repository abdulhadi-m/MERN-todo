import { useEffect, useState } from 'react'
import axios from 'axios'
import '../src/index.css'
import { TodoProvider } from './Context/TodoContext'
import { TodoForm, TodoItems } from './Components'

function App() {
  const [todos, setTodos] = useState([])

  // bringing todos frm server
  const fetchTodos = async () => {
    try {
      const response = await axios.get("https://mern-todo-mkb4.onrender.com/todo");
      if (response.data.success) {
        setTodos(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  // adding new todos
  const addTodo = async (todo) => {
    try {
      const response = await axios.post("https://mern-todo-mkb4.onrender.com/todo", { data: todo });
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
      const response = await axios.put(`https://mern-todo-mkb4.onrender.com/todo/${id}`, { data: updatedTodo });
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
      const response = await axios.delete(`https://mern-todo-mkb4.onrender.com/todo/${id}`);
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
      const response = await axios.put(`https://mern-todo-mkb4.onrender.com/todo/${id}`, {
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