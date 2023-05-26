// // routes/task.js
// const express = require('express');
// const router = express.Router();
// const Task = require('../models/task');

// // Rota para criar uma tarefa
// router.post('/tasks', async (req, res) => {
//   try {
//     const { title, description, userId } = req.body;
//     const task = new Task({ title, description, userId });
//     await task.save();
//     res.status(201).json(task);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Rota para obter todas as tarefas
// router.get('/tasks', async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Rota para obter uma tarefa específica
// router.get('/tasks/:id', async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       return res.status(404).json({ error: 'Task not found' });
//     }
//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Rota para atualizar uma tarefa
// router.put('/tasks/:id', async (req, res) => {
//   try {
//     const { title, description, userId } = req.body;
//     const task = await Task.findByIdAndUpdate(
//       req.params.id,
//       { title, description, userId },
//       { new: true }
//     );
//     if (!task) {
//       return res.status(404).json({ error: 'Task not found' });
//     }
//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Rota para excluir uma tarefa
// router.delete('/tasks/:id', async (req, res) => {
//   try {
//     const task = await Task.findByIdAndRemove(req.params.id);
//     if (!task) {
//       return res.status(404).json({ error: 'Task not found' });
//     }
//     res.json({ message: 'Task deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;

const express = require('express');
const taskRoute = express.Router();
const TaskModel = require('../models/task');

taskRoute.route('/').get((req, res, next) => {
  TaskModel.find()
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