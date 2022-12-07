const express = require('express')

const todoController = require('../controllers/todoController.js')

const router = express.Router();

router.get('/', todoController.getToDo, (req, res) => {
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.status(200).json(res.locals.toDos);
})

router.post('/submit', todoController.postToDo, (req, res) => {
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.status(200).json(res.locals.toDos);
})

router.patch('/update/:itemName', todoController.updateToDo, (req, res) => {
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.status(200).json();
})

router.delete('/delete/:item', todoController.deleteToDo, (req, res) => {
  res.status(200).json();
})

module.exports = router;