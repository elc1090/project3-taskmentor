// const express = require('express');
// const mongoose = require('mongoose');
// const userRoutes = require('./routes/user.route.js');
// const taskRoutes = require('./routes/task.route.js');
// const cors = require('cors');

// const app = express();
// const PORT = 4000;

// app.use(express.json());
// app.use(cors());

// // Conectando ao banco de dados MongoDB
// mongoose.connect('mongodb://localhost:27017/task-manager', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // useCreateIndex: true
// })
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch((error) => {
//   console.error('Error connecting to MongoDB:', error);
// });

// // Rotas
// app.use(userRoutes);
// app.use(taskRoutes);

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

let express = require('express'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  database = require('./database'),
  bodyParser = require('body-parser');

// Conectando MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Banco de dados conectado")
  },
  error => {
    console.log("Erro ao conectar o banco de dados: " + error)
  }
)

const taskAPI = require('../backend/routes/task.route')
const userAPI = require('../backend/routes/user.route')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// API
app.use('/api',userAPI)
app.use('/api/task', taskAPI)

// Criando a porta
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Conectado na porta ' + port)
})

// Error 404
app.use((req, res, next) => {
  next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});