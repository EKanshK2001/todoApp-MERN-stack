const express = require('express');
const app = express();
const { todo } = require('./db');
const { createTodo, updateTodo } = require('./types');


app.use(express.json());


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
        title: parsedPayload.title,
        description: parsedPayload.description,
        completed: false
    })
});

app.get('/todo', async (req, res) => {
    const todos = await todo.find();

    res.status(200).json({
        todos: todos
    });
});

app.put('/completed', async (req, res) => {
    const updatePayload = req.body;
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

