const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/useRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());



//CONNECT MONGO DB
const URI = process.env.MONGODB_URL;

mongoose.connect(URI).then(() => {
    console.log("MongoDB connected.");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

app.use('/user', router);
app.use('/api', categoryRouter);
app.use('/api', productRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
