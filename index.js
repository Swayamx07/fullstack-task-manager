const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const User = require("./models/User");
const Task = require("./models/Task");
const Activity = require("./models/Activity");
const auth = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-manager-frontend-psi-umber.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("API is live");
});

app.get("/health", (req, res) => {
  res.send("Server running");
});

// Register
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
        issuer: "taskeasy-api",
      }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create Task
app.post("/tasks", auth, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title)
      return res.status(400).json({ message: "Title is required" });

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || "",
      status,
      priority,
      dueDate,
      user: req.user.userId,
    });

    await Activity.create({
      user: req.user.userId,
      action: "created_task",
      task: task._id,
      taskTitle: task.title,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get Tasks (Pagination + Filtering)
app.get("/tasks", auth, async (req, res) => {
  try {
    const {
      status,
      priority,
      search,
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    const filter = { user: req.user.userId };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.min(Number(limit) || 10, 50);
    const skip = (pageNumber - 1) * limitNumber;

    const sortOptions = {
      [sort]: order === "asc" ? 1 : -1,
    };

    const tasks = await Task.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber);

    const total = await Task.countDocuments(filter);

    res.json({
      tasks,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        pages: Math.ceil(total / limitNumber),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Update Task
app.put("/tasks/:id", auth, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    await Activity.create({
      user: req.user.userId,
      action: "updated_task",
      task: updatedTask._id,
      taskTitle: updatedTask.title,
    });

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Delete Task
app.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    await Activity.create({
      user: req.user.userId,
      action: "deleted_task",
      taskTitle: deletedTask.title,
    });

    res.json(deletedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//  ACTIVITY ROUTE 
app.get("/activities", auth, async (req, res) => {
  try {
    const activities = await Activity.find({
      user: req.user.userId,
    })
      .populate("task", "title")
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//  GLOBAL ERROR HANDLER 

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});