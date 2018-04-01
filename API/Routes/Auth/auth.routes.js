const Express = require('express');
const Router = Express.Router();
const ClientClass = require('../../Controllers/client.controller');
const Client = new ClientClass();
const EmployeeClass = require('../../Controllers/employee.controller');
const Employee = new EmployeeClass();
const CheckToken = require('../../Config/checkToken');
const { handleAsyncExceptions } = require('../../Errors');

Router
    .route('/clients')
    .post(handleAsyncExceptions(Client.login));

Router
    .route('/employees')
    .post(handleAsyncExceptions(Employee.login));

Router
    .route('/checkToken/:type')
    .post(handleAsyncExceptions(CheckToken));

module.exports = Router;