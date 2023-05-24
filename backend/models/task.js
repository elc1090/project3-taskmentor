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

module.exports = mongoose.model('Task', taskSchema)