const jwt = require('jsonwebtoken');
const config_key = require('../../config/config_key');

const employeeModel = require('../models/employee.model');

exports.signup = (req, res) => {
  employeeModel.createNewEmployee(req.body)
    .then(data => {
      return res.status(201).json({
        success: true,
        message: 'create successful!',
        result: data
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: err
      });
    })

}


exports.login = (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    employeeModel.findUserByUsername({ username, password })
      .then(data => {
        if (data[0]) {
          // if username is exist
          if (data[0].Password === password) {

            const token = jwt.sign({
              _id: data[0].EmployeeID,
              username: data[0].Username,
              role: data[0].Position,
              firstName: data[0].EmployeeFirstName,
              lastName: data[0].EmployeeLastName,
              photoUrl: data[0].photoUrl
            },
              config_key.jwtSecret,
              {
                expiresIn: '24h' // option expires in 24 hours
              });

            return res.status(200).json({
              success: true,
              message: 'Authentication successful!xx',
              token: token
            });
          } else {
            // wrong password //status 400
            return res.json({
              success: false,
              message: 'This password is wrong!'
            });
          }

        } else {
          // username not match status(400)
          return res.json({
            success: false,
            message: 'Username isn\'t match!'
          })
        }
      })
      .catch(err => {
        //status(400)
        return res.json({
          success: false,
          message: err
        })
      })

  } else {
    // .status(400)
    return res.json({
      success: false,
      message: 'Authentication failed! Please check the request'
    })
  }
}
