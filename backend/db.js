const mongoose = require ('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongoURL);

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}

/*
    Todo {

    }
*/