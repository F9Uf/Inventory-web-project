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
          if (data[0].password === password) {

            const token = jwt.sign({
              _id: data[0].employeeID,
              username: data[0].username,
              role: data[0].position
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
