const express = require('express');
const { todoCreateHandler, allTodos, deleteTodo } = require('../controllers/todoControllers');

const router = express.Router();

// to create a todo
router.post("/todo-form", todoCreateHandler);
// to get all todos
router.get('/get-todos',allTodos)

// to delete a todoy
router.delete('/delete-todo/:id',deleteTodo)

module.exports = router;