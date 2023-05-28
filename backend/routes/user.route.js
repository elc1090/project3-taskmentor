// routes/user.js
const express = require('express');
const userRouter = express.Router();
const UserModel = require('../models/user');

userRouter.route('/create-user').post((req, res, next) => {
  UserModel.create(req.body).then((data) => {
    res.json(data);
  }).catch((error) => {
    next(error);
  });
});

userRouter.route('/:id').get((req, res, next) => {
  const userId = req.params.id;
  UserModel.findById(userId)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    })
    .catch((error) => {
      next(error);
    });
});

userRouter.route('/login').post((req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne({ email, password })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    })
    .catch((error) => {
      next(error);
    });
});

userRouter.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Ocorreu um erro interno.' });
});

module.exports = userRouter;