const User = require('../Abstracts/user.abstract');
const EmployeeModel = require('../Models/employee.model');

class EmployeeController extends User {
    constructor() {
        super(EmployeeModel);
    }
}

module.exports = EmployeeController;