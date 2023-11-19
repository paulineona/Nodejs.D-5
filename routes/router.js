// Import the necessary modules
const express = require('express');
const router = express.Router();
const EmployeeModel = require('../model/employee');

// Define a route handler for GET requests to the root ('/') path
router.get('/', (req, res) => {
    // Use the find() method of EmployeeModel to fetch all documents from the employees collection in MongoDB
    EmployeeModel.find()
        .then((employee) => {
            // If the query is successful, send the result (an array of employee documents) as a JSON response
            res.json(employee);
        }).catch((err) => {
            // If an error occurs while executing the query, send a JSON response with a status code of 500 (Internal Server Error) and the error message
            res.status(500).json({ error: err });
            res.status(500).json({ error: err });
        });
});

// Define a route handler for POST requests to the '/add' path
router.post('/add', (req, res) => {
    // Create a new EmployeeModel instance with the data from the request body
    const employee = new EmployeeModel(req.body);
    // Save the new employee document to MongoDB
    employee.save()
        .then((employee) => {
            // If the save operation is successful, send the newly created employee document as a JSON response
            res.json(employee);
        }).catch((err) => {
            // If an error occurs while saving the document, send a JSON response with a status code of 500 (Internal Server Error) and the error message
            res.status(500).json({ error: err });
        });
});

// Define a route handler for PUT requests to the '/update' path
router.put('/update', (req, res) => {
    EmployeeModel.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(employee => {
            // If no document with the provided ID is found, send a JSON response with a status code of 404 (Not Found) and an error message
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            // If the update operation is successful, send the updated employee document as a JSON response
            res.json(employee);
        })
        .catch(err => {
            // If an error occurs while updating the document, send a JSON response with a status code of 500 (Internal Server Error)
            res.status(500).json({});
        });
});

// Define a route handler for DELETE requests to the '/delete/:id' path
router.delete('/delete/:id', (req, res) => {
    // Use the findByIdAndDelete() method of EmployeeModel to delete the document with the ID from the request parameters
    EmployeeModel.findByIdAndDelete(req.params.id)
    EmployeeModel.findByIdAndDelete(req.params.id)
        .then(employee => {
            if (!employee) {
                // If no document with the provided ID is found, send a JSON response with a status code of 404 (Not Found) and an error message
                return res.status(404).json({
                    error: 'Employee not found'
                });
            }
            res.json({
                // If the delete operation is successful, send a JSON response with a success message
                message: "Employee deleted successfully!"
            });
        })
        .catch(err => {
            // If an error occurs while deleting the document, send a JSON response with a status code of 500 (Internal Server Error) and the error message
            res.status(500).json({
                error: err
            });
        });
});

// Define a route handler for GET requests to the '/count' path
router.get('/count', (req, res) => {
    // Perform an aggregation operation to count the number of employees in each department
    EmployeeModel.aggregate([
        { $group: { _id: "$department", count: { $sum: 1 } } }
    ])
        .then(result => {
            // If the operation is successful, send the result as a JSON response
            res.json(result);
        })
        .catch(err => {
            // If an error occurs while executing the operation, send a JSON response with a status code of 500 (Internal Server Error) and the error message
            res.status(500).json({ error: err });
        });
});

// Export the router so it can be used in other parts of the application
module.exports = router;