const express = require('express');
const todoController = require('../controllers/todoController.js');
const router = express.Router();

router.get('/', todoController.getToDo, (req, res) => {
  res.status(200).json(res.locals.toDos);
});

router.post('/submit/:item', todoController.postToDo, (req, res) => {
  res.status(200).json(res.locals.toDos);
});

router.put(
  '/update/:oldItem/:newItem',
  todoController.updateToDo,
  (req, res) => {
    res.status(200).json(res.locals.toDos);
  }
);

router.delete('/delete/:item', todoController.deleteToDo, (req, res) => {
  res.status(200).json(res.locals.toDos);
});

module.exports = router;
