const jwt = require('jsonwebtoken');
const config_key = require('../../config/config_key');

const employeeModel = require('../models/employee.model');

exports.signup = (req, res) => {
    employeeModel.createNewEmployee(req.body, (err, data) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err
            });
        } else {
            return res.status(201).json({
                success: true,
                message: 'create successful!',
                result: data
            });
            console.log(data);
            
        }
    })
}


exports.login = (req, res) => {
    const {username, password} = req.body;

    if (username && password) {
        employeeModel.findUserByUsername({username, password}, (err, data) => {
            if (err) {
                return res.json({
                    success: false,
                    message: err
                });
            } else {
                // if username is exist
                
                if (data[0].Password === password) {
                    const token  = jwt.sign({
                        sub: data[0].EmployeeID,
                        username: data[0].Username,
                        role: data[0].Position
                    },
                    config_key.jwtSecret,
                    {
                        expiresIn: '24h' // option expires in 24 hours
                    });

                    return res.status(200).json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });
                } else {
                    // wrong password
                    return res.status(400).json({
                        success: false,
                        message: 'This password is wrong!'
                    });
                }

            }
        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        })
    }
}
