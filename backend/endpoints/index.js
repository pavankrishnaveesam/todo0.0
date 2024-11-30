const express = require("express");
const mongoose = require("mongoose");
const zod = require("zod");
const bodyParser = require("body-parser");
const { ToDo } = require("../db");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

// Allow requests from a specific origin
app.use(
  cors({
    origin: "*",
  })
);

app.get("/todos", async (req, res) => {
  const allTodos = await ToDo.find({});
  if (allTodos) {
    res.status(200).json(allTodos);
  } else {
    res.status(500).json({ msg: "DB error" });
  }
});

app.post("/newtodo", async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const isDone = false;
  const lastUpdated = new Date().toISOString();
  const newTodo = await ToDo.create({
    name,
    description,
    isDone,
    lastUpdated,
  });
  if (newTodo) {
    res.status(200).json({ msg: "ToDo added succesfully" });
  } else {
    res.status(500).json({ msg: "DB error" });
  }
});
app.post("/delete", async (req, res) => {
  const id = req.body.id;
  const deleted = await ToDo.deleteOne({ _id: id });
  if (deleted) {
    res.status(200).json(deleted);
  } else {
    res.status(500).json({ msg: "DB error" });
  }
});
app.post("/update", async (req, res) => {
  const id = req.body.id;
  const isDone = req.body.isDone;
  const updatedRecord = await ToDo.updateOne(
    { _id: id }, // Filter by _id --get the record from db with id
    { $set: { isDone: isDone } } // Update `isDone` field --update the column/property
  );
  if (updatedRecord) {
    res.status(200).json(updatedRecord);
  } else {
    res.status(500).json({ msg: "DB error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
