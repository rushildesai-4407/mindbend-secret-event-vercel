const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

console.log("Starting server...");   // DEBUG

const app = express();

console.log("MONGO URI:", process.env.MONGODB_URI); // DEBUG

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("Mongo Error:", err));

app.listen(3004, () => console.log("Server running on port 3000"));