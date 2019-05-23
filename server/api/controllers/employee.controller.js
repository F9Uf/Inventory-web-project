const employeeModel = require('../models/employee.model');

exports.getOneEmployee = (req, res) => {
  employeeModel.findUserById({ id: req.params.employee_id })
    .then(data => {
      if (data[0]) {
        // found user
        return res.status(200).json({
          success: true,
          message: 'Successfully found the user',
          result: data[0]
        });
      } else {
        // not found user  #400
        return res.json({
          success: false,
          message: 'User not found!'
        })
      }
    })
    .catch(err => {
      // #400
      return res.json({
        success: false,
        message: err
      })
    })

}

/** @todo #5 add permisstion
 * employee can update only their own information
 * manager can update all employees
 * shop manager can update only shop's own information (not sure)
*/

exports.updateOneEmployee = (req, res) => {
  employeeModel.updateEmployee({id: req.params.employee_id, field: req.body})
  .then(data => {
    return res.status(200).json({
      success: true,
      message: 'update is success!'
    })
  })
  .catch(err => {
    console.log(err)
    return res.json({
      success: false,
      message: 'update is error!!'
    })
  })
}
