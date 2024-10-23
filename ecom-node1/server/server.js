const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000




app.listen(PORT, () => {
    console.log("server running.");
})

//CONNECT MONGO DB 

const URI = process.env.MONGODB_URL