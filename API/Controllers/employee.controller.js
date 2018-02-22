const userAbstract = require('../Abstracts/user.abstract');
const Bluebird = require('bluebird');
const JwtSign = Bluebird.Promise.promisify(require('jsonwebtoken').sign);
const Secret = require('../Config/secret');
const EmployeeModel = require('../Models/employee.model');

class EmployeeController extends userAbstract {
    async create(req, res) {
        const employee = new EmployeeModel(req.body);
        employee.hashedPassword = await employee.encryptPassword(req.body.password);
        await employee.save();
        res
            .status(201)
            .json(employee);
    }

    async login(req, res) {
        const employee = await EmployeeModel.findOne({
            'email': req.body.email,
            'isActive': true
        });
        if (await employee.checkPassword(req.body.password)) {
            const token = await JwtSign(employee.toJSON(), Secret.secret);
            if (token) {
                return res
                    .status(200)
                    .json({
                        'employee': employee,
                        'token': token
                    })
            }
        } else {
            return res
                .status(401)
                .json({'message': 'No logueado'});
        }
    }

    async modify(req, res) {
        const employeeId = req.params.employeeId;
        await EmployeeModel.update({
            '_id': employeeId,
            'isActive': true
        }, { $set: req.body });
        return res
            .status(204)
            .json();
    }

    async delete(req, res) {
        const employeeId = req.params.employeeId;
        await EmployeeModel.update({
            '_id': employeeId,
            'isActive': true
        }, { $set: { 'isActive': false } });
        return res
            .status(204)
            .json();
    }

    async getAllEmployees(req, res) {
        const quantity = req.query.quantity || 10;
        const page = req.query.page || 1;
        const employee = await EmployeeModel.find({
            'isActive': true
        })
            .skip((quantity * page) - quantity)
            .limit(+quantity);
        res
            .status(200)
            .json(employee);
    }

    async getSingleClient(req, res) {
        const employeeId = req.params.employeeId;
        const employee = await EmployeeModel.findOne({
            '_id': employeeId,
            'isActive': true
        });
        res
            .status(200)
            .json(employee);
    }
}