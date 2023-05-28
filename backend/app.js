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

console.log(process.env.PORT)
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