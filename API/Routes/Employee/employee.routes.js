const Express = require('express');
const Router = Express.Router();
const EmployeeClass = require('../../Controllers/employee.controller');
const Employee = new EmployeeClass();

Router
    .route('/')
    .get(Employee.getAll)
    .post(Employee.create);

Router
    .route('/:id')
    .get(Employee.getSingle)
    .put(Employee.modify)
    .delete(Employee.delete);

module.exports = Router;