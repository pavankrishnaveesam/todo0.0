const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://pavankrishna2321:UgirMCpnrsQbTE0t@cluster0.nohzt.mongodb.net/"
);

//Schema
const ToDoSchema = new mongoose.Schema({
  name: String,
  description: String,
  isDone: Boolean,
});

//Model
const ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = {
  ToDo,
};
