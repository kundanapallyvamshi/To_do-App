const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false
  },
  userId: {
    type: String,
    require: true
  }
}, { timestamps: true });

const Data = mongoose.model('tasks', dataSchema);

module.exports = Data;