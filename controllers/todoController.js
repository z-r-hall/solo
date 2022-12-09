const List = require('../models/todoData.js');

const todoController = {};

todoController.getToDo = async (req, res, next) => {
  try {
    const result = await List.find();
    res.locals.toDos = result;
    return next();
  } catch (err) {
      return next({
        log: 'Express error handler caught a getToDo middleware error',
        status: 400,
        message: { err: err },
      });
    }
};

todoController.postToDo = async (req, res, next) => {
  try {
    const item = req.params.item;
    await List.create({item});
    res.locals.toDos = await List.find()
    return next();
  } catch (err) {
      return next({
        log: 'Express error handler caught a postToDo middleware error',
        status: 400,
        message: { err: err },
      });
  }
};

todoController.updateToDo = async (req, res, next) => {
  try {
    const oldItem = req.params.oldItem;
    const newItem = req.params.newItem;
    await List.findOneAndUpdate({item: oldItem}, {item: newItem});
    res.locals.toDos = await List.find();
    return next();
  } catch (err) {
      return next({
        log: 'Express error handler caught a updateToDo middleware error',
        status: 400,
        message: { err: err },
      });
  }
};

todoController.deleteToDo = async (req, res, next) => {
  try {
    const item = req.params.item;
    await List.deleteOne({item});
    res.locals.toDos = await List.find();
    return next();
  } catch (err) {
      return next({
        log: 'Express error handler caught a deleteToDo middleware error',
        status: 400,
        message: { err: 'err' },
      });
  }
};

module.exports = todoController;
