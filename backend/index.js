const express = require('express')

// importing the dotenv module so that we can use it to load environment variables from a .env file
const dotenv= require('dotenv')

// importing the cors module so that we can use it to allow cross-origin requests 
const cors = require('cors')

// importing the routes here!
const todoRoutes = require('./route/todo-routes')

const DbConnection=require('./config/db')

// using the cors middleware to allow cross-origin requests from any origin
dotenv.config()

const app = express()

DbConnection()

// using process.env.PORT to get the port number from the environment variables, if it is not set, it will default to 8081
const PORT = process.env.PORT || 8081
app.use(cors())
app.use(express.json())

app.use('/todo', todoRoutes)

app.get('/', (req,res)=>{
    res.status(200).json({
        message: "Home Page..."
    })
})

app.listen(PORT,()=>{console.log(`Server is up and running on http://localhost:${PORT}`)})
