const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 140
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
