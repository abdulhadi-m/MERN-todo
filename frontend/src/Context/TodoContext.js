import { useContext, createContext } from "react";

export const TodoContext = createContext({
    todos: [{
        _id: "1", 
        todo: "Task",
        isCompleted: false
    }],
    updateTodo: (id, todo) => {},
    addTodo: (todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})

export const useTodo = () =>{
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider