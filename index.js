const express = require("express");

const app = express();
const PORT = 5000;

app.get("/health", (req, res) => {
    res.send("Server running");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
