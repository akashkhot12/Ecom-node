const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

//CONNECT MONGO DB
const URI = process.env.MONGODB_URL;

mongoose.connect(URI).then(() => {
    console.log("MongoDB connected.");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
