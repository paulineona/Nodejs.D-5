//Import the necessary modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define a new schema for the employee documents in MongoDB
const Employee = new Schema({
    // The employee's name is a required string
    name: {
        type: String,
        required: true,
    },
    // The employee's department is a required string
    department: {
        type: String,
        required: true,
    },
    // The employee's salary is a required number
    salary: {
        type: Number,
        required: true,
    }
});

// Create a model from the employee schema
// This model provides methods to interact with the employees collection in MongoDB
const EmployeeModel = mongoose.model('Employee', Employee);

// Export the employee model so it can be used in other parts of the application
module.exports = EmployeeModel;