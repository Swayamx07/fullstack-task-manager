console.log("INDEX.JS IS RUNNING");

const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Task = require("./models/Task")
const express = require("express");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/health", (req, res) => {
  res.send("Server running");
});

app.get("/", (req, res) => {
  res.send("API is live");
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});

let tasks = [];

app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;


    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = await Task.create({
      title,
      description,
    });


    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
})

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(deletedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


app.get("/health", (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
