const express = require('express');
const taskRoute = express.Router();
const TaskModel = require('../models/task');

taskRoute.route('/:userId').get((req, res, next) => {
  const userId = req.params.userId;
  TaskModel.find({ user: userId })
    .exec()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

taskRoute.route('/complete-task/:id').post((req, res, next) => {
  const taskId = req.params.id;
  const completed = req.body.concluded;

  TaskModel.findByIdAndUpdate(taskId, { $set: { concluded: completed } })
    .then((data) => {
      res.json(data);
      console.log('Tarefa concluída com sucesso!');
    })
    .catch((error) => {
      next(error);
    });
});

taskRoute.route('/create-task').post((req, res, next) => {
  TaskModel.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      next(error);
    });
});

taskRoute.route('/edit-task/:id').get((req, res, next) => {
  TaskModel.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      next(error);
    });
});

taskRoute.route('/update-task/:id').post((req, res, next) => {
  TaskModel.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((data) => {
      res.json(data);
      console.log('Tarefa atualizada com sucesso!');
    })
    .catch((error) => {
      next(error);
    });
});

taskRoute.route('/delete-task/:id').delete((req, res, next) => {
  TaskModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.status(200).json({ msg: data });
    })
    .catch((error) => {
      next(error);
    });
});

// Middleware de tratamento de erros
taskRoute.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Ocorreu um erro interno.' });
});


module.exports = taskRoute;