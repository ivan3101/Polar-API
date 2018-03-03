const Express = require('express');
const Router = Express.Router();
const EmployeeClass = require('../../Controllers/employee.controller');
const Employee = new EmployeeClass();
const { handleAsyncExceptions } = require('../../Errors');

Router
    .route('/')
    .get(handleAsyncExceptions(Employee.getAll))
    .post(handleAsyncExceptions(Employee.create));

Router
    .route('/:id')
    .get(handleAsyncExceptions(Employee.getSingle))
    .put(handleAsyncExceptions(Employee.modify))
    .delete(handleAsyncExceptions(Employee.delete));

module.exports = Router;