const zod = require('zod');

/*
    create TODO schema {
        title: String,
        description: String,
    }

    update TODO schema {
        id : string,
    }
*/

const createTodo = zod.object({
    title: zod.string(),
    description: zod.string()
});

const updateTodo = zod.object({
    id: zod.string(),
});

module.exports = {
    createTodo: createTodo,
    updateTodo: updateTodo
}
