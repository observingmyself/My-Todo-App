const mongoose = require('mongoose')

const todoModel = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    completed : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('todos',todoModel)