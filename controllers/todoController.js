const List = require('../models/todoData.js');

const todoController = {};

todoController.getToDo = async (req, res, next) => {
  try {
    const result = await List.find();
    res.locals.toDos = result;
    return next();
  } catch (err) {
    if (err) {
      return next({
        log: 'Express error handler caught a getToDo middleware error',
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
  }
};

todoController.postToDo = async (req, res, next) => {
  try {
    const item = req.params.item;
    const newToDo = new List({item: item});
    await newToDo.save();
    res.locals.toDos = await List.find()
    return next();
  } catch (err) {
    if (err) {
      return next({
        log: 'Express error handler caught a postToDo middleware error',
        status: 400,
        message: { err: 'An error occurred in POST TO DO' },
      });
    }
  }
};

todoController.updateToDo = async (req, res, next) => {
  try {
    const oldItem = req.params.itemName;
    const newItem = req.body.item;
    const newToDo = await List.findOneAndUpdate({item: oldItem}, {item: newItem});
    return next();
  } catch (err) {
    if (err) {
      return next({
        log: 'Express error handler caught a updateToDo middleware error',
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
  }
};

todoController.deleteToDo = async (req, res, next) => {
  try {
    const item = req.params.item;
    await List.deleteOne({item: item});
    const updated = await List.find();
    res.locals.toDos = updated;
    return next();
  } catch (err) {
    if (err) {
      return next({
        log: 'Express error handler caught a deleteToDo middleware error',
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
  }
};

module.exports = todoController;
