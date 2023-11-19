const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/employee", {
}).then(() => {
    console.log("Successfully connected to MongoDB.");
}).catch((err) => {
    console.log(err);
});

app.use('/employee', router);

app.listen(3090, () => {
    console.log("Server started on port 3090.");
})


