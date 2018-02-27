const userAbstract = require('../Abstracts/user.abstract');
const EmployeeModel = require('../Models/employee.model');

class EmployeeController extends userAbstract {
    constructor() {
        super(EmployeeModel);
    }
}