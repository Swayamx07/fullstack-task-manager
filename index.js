const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];

app.post("/tasks", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const newTask = {
        id: Date.now(),
        title: title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask)
})

app.get("/tasks", (req, res) => {
    res.json(tasks);
})

app.put("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);
    const { title, completed } = req.body;

    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    if (title !== undefined) {
        task.title = title;
    }

    if (completed !== undefined) {
        task.completed = completed;
    }

    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);

    const index = tasks.findIndex(t => t.id === taskId);

    if (index === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    const deletedTask = tasks.splice(index, 1);
    res.json(deletedTask[0]);
});

app.get("/health", (req, res) => {
    res.send("Server running");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
