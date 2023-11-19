// Import the necessary modules
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');

// Create an Express application
const app = express();

// Use the express.json() middleware to parse JSON request bodies
app.use(express.json());

// Connect to the MongoDB server
mongoose.connect("mongodb://127.0.0.1:27017/employee", {
}).then(() => {
    // If the connection is successful, log a success message
    console.log("Successfully connected to MongoDB.");
}).catch((err) => {
    // If an error occurs while connecting, log the error message
    console.log(err);
});

// Use the router for requests to paths starting with '/employee'
app.use('/employee', router);

// Start the server on port 3090
app.listen(3090, () => {
    console.log("Server started on port 3090.");
})


