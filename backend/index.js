const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose')
const { todo } = require('./db');
const { createTodo, updateTodo } = require('./types');


app.use(express.json());
app.use(cors());


app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "you sent the wrong inputs",
        })
        return;
    }

    //put the data in mongodb
    await todo.create ({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
        msg: "todo created successfully!"
    })
});

app.get('/todo', async (req, res) => {
    const todos = await todo.find();

    res.status(200).json({
        todos: todos
    });
});

app.put('/completed', async (req, res) => { //doesnt work
    const updatePayload = req.body;
    console.log(updatePayload)
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "you sent the wrong inputs",
        })
        return;
    }

    await todo.update({
        _id: req.body.id
    }, {
        completed: true
    })

    res.json({
        msg: "Todo marked as completed"
    })
});

const PORT = process.env.PORT;

app.listen (PORT, () => {
    console.log(`server running at ${PORT}`);
})
