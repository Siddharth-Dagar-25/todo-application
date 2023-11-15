const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    deafult: false,
  },
});

module.exports = mongoose.model("ToDo", toDoSchema);
