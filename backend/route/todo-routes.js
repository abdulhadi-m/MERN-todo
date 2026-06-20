const express = require('express')

const {getAllTodos, createTodo, updateTodo, getSingleTodo, deleteTodo, searchTodo} = require('../controllers/todo-controller')

// did this intentionally to avoid confusion
const routerr = express.Router();

/**
 * Route: /todos
 * Method: GET
 * Description: Get of all the todos
 * Access: public
 * Parameters: none
 */
routerr.get('/', getAllTodos)


/**
 * Route: /todos
 * Method: POST
 * Description: Add a new todo
 * Access: public
 * Parameters: none
 */


// Idhar '/:id' nahi ayega!!!!!!!! 
routerr.post('/', createTodo)



routerr.get('/search', searchTodo)
/**
 * Route: /todos/:id
 * Method: PUT
 * Description: Update a TODO by it's id
 * Access: public
 * Parameters: id
 */
routerr.put('/:id', updateTodo)


/**
 * Route: /todos/:id
 * Method: GET
 * Description: Get a todo by it's id
 * Access: public
 * Parameters: id
 */
routerr.get('/:id', getSingleTodo)

/**
 * Route: /todos/:id
 * Method: DELETE
 * Description: Delete a todo by it's id
 * Access: public   
 * Parameters: id
 */
routerr.delete('/:id', deleteTodo)


module.exports = routerr