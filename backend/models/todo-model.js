 const mongoose = require('mongoose')
 const structure = mongoose.Schema
 const toDoStructure = new structure({
    todo:{
        type: String,
        required: true
    },isCompleted:{
        type: Boolean,
        default: false
    }
 },{timestamps: true})
 module.exports = mongoose.model("Todo", toDoStructure)