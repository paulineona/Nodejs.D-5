const express = require('express');
const router = express.Router();
const EmployeeModel = require('../model/employee');

router.get('/', (req, res) => {
    EmployeeModel.find()
        .then((employee) => {
            res.json(employee);
        }).catch((err) => {
            res.status(500).json({ error: err });
        });
});

router.post('/add', (req, res) => {
    const employee = new EmployeeModel(req.body);
    employee.save()
        .then((employee) => {
            res.json(employee);
        }).catch((err) => {
            res.status(500).json({ error: err });
        });
});

router.put('/update', (req, res) => {
    EmployeeModel.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(employee => {
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            res.json(employee);
        })
        .catch(err => {
            res.status(500).json({});
        });
});

router.delete('/delete/:id', (req, res) => {
    EmployeeModel.findByIdAndDelete(req.params.id)
        .then(employee => {
            if (!employee) {
                return res.status(404).json({
                    error: 'Employee not found'
                });
            }
            res.json({
                message: "Employee deleted successfully!"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;