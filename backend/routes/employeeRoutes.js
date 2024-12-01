const express = require('express');
const {
    getEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
} = require('../controllers/employeeController');

const router = express.Router();

router.get('/search', searchEmployees);

router.get('/', getEmployees);

router.get('/:id', getEmployeeById);

router.post('/', addEmployee);

router.put('/:id', updateEmployee);

router.delete('/:id', deleteEmployee);

module.exports = router;
