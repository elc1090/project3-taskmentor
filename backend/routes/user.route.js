// routes/user.js
const express = require('express');
const userRouter = express.Router();
const UserModel = require('../models/user');

userRouter.route('/create-user').post((req, res, next) => {
  UserModel.create(req.body)
    .then((data) => {
      console.log(data)
      res.json(data);
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

// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');

// // Rota para criar um usuário
// router.post('/users', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = new User({ name, email, password });
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Rota para obter todos os usuários
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Rota para obter um usuário específico
// router.get('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Rota para atualizar um usuário
// router.put('/users/:id', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email, password },
//       { new: true }
//     );
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Rota para excluir um usuário
// router.delete('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndRemove(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json({ message: 'User deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
