
// updateTodo (PUT/PATCH):

// Kisi task ka naam badalna ho ya use complete mark karna ho (isCompleted: true/false).

// Hint: req.params.id se id nikal kar await Todo.findByIdAndUpdate(id, data, {new: true}) lagao.

// deleteTodo (DELETE):

// Task ko database se udana hai.

// Hint: await Todo.findByIdAndDelete(id) use karo.

const todoModel = require('../models/todo-model')

exports.getAllTodos = async(req,res)=>{
    const todos = await todoModel.find()

    if(todos.length === 0){
        return res.status(200).json({
            success: true,
            data: [],
            message: "No todo to display"
        })
    }
    
    res.status(200).json({
        success: true,
        data: todos
    })
}


exports.createTodo = async(req,res)=>{
    const {data} = req.body

    if(!data || Object.keys(data).length===0){
        // 400 means bad request
        return res.status(400).json({
            success: false,
            message: "Incomplete"
        })
    }
    const newTodo = await todoModel.create(data)

    res.status(201).json({
        success: true,
        data: newTodo
    })
}

exports.updateTodo = async(req,res)=>{
    const {id} = req.params
    const {data} = req.body

    if(!data || Object.keys(data).length ===0){
        return res.status(400).json({
            success: false,
            message: "Please provide the content."
        })
    }
    const todoUpdated = await todoModel.findByIdAndUpdate(id, data, {new:true})

    if(!todoUpdated){
        return res.status(404).json({
            success: false,
            message: `${id}: Todo not found`
        })
    }
    res.status(200).json({
        success: true,
        data: todoUpdated,
        message: "Todo Updated Successfully"
    })
}


exports.getSingleTodo = async(req,res)=>{
    const {id} = req.params
    const todo = await todoModel.findById(id)

    if(!todo){
        return res.status(404).json({
            success: false,
            message: `Todo Not found by ID:${id}`
        })
    }
    res.status(200).json({
        success: true,
        data: todo
    })
}


exports.deleteTodo = async(req,res)=>{
    const {id} = req.params
    const todo = await todoModel.findByIdAndDelete(id)

    if(!todo){
        return res.status(404).json({
            success: false,
            message: `Todo Not found by ID:${id}`
        })
    }
    
    res.status(200).json({
        success: true,
        message: "Todo Deleted Successfully"
    })
}