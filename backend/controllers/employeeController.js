const Employee = require('../models/employeeModel');

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addEmployee = async (req, res) => {
    const { firstName, lastName, email, department, position, salary } = req.body; 

    try {

        if (!firstName || !lastName || !email || !department || !position || !salary) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newEmployee = new Employee({
            firstName,
            lastName,
            email,
            department,
            position,
            salary, 
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, department, position, salary} = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { firstName, lastName, email, department, position, salary },
            { new: true, runValidators: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const searchEmployees = async (req, res) => {
    const { department, position } = req.query;

    try {
        const query = {};
        if (department) query.department = department;
        if (position) query.position = position;

        const employees = await Employee.find(query);
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
};
