const db = require('../../db')

module.exports = (req,res) =>{
    const sql = 'SELECT employeeID,employeeFirstName,employeeLastName,employeePhotoUrl,position FROM employee'
    db.query(sql, (err, data) => {
        if (err) {
          return res.json({
            success: false,
            message: err
          })
        } else {
          if (data) {
            return res.json({
              success: true,
              message: 'Successfully found the employees!',
              result: data
            })
          } else {
            // if not found
            return res.json({
              success: false,
              message: 'There are no employee!'
            })
          }
        }
      })
}