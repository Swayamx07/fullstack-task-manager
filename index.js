const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());

let tasks = [];

app.post("/tasks", (req, res) => {
    const {title} = req.body;

    if (!title) {
        return res.status(400).json({message: "Title is required"});
    }

    const newTask = {
        id: Date.now(),
        title: title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask)
})

app.get("/tasks", (req, res) =>{
    res.json(tasks);
})

app.get("/health", (req, res) => {
    res.send("Server running");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
