// // models/Task.js
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const taskSchema = new Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
// }, { collection: 'task' });

// const Task = mongoose.model('Task', taskSchema);

// module.exports = Task;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: Number
  }
}, {
  collection: 'task'
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task