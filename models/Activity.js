const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        action: {
            type: String,
            required: true,
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        },
        taskTitle: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);