const employeeModel = require('../models/employee.model');

exports.getOneEmployee = (req, res) => {
    employeeModel.findUserById({id:req.params.employee_id}, (err, data) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err
            })
        } else {
            if (data[0]) {
                // found user
                return res.status(200).json({
                    success: true,
                    message: 'Successfully found the user',
                    result: data[0]
                });
            } else {
                // not found user 
                return res.status(404).json({
                    success: false,
                    message: 'User not found!'
                })
            }
        }
    });
}