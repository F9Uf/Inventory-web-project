const db = require('../../db')

module.exports = (req,res) =>{
    const sql = 'SELECT a.employeeID, a.employeeFirstName, a.employeeLastName, a.employeePhotoUrl, b.positionName FROM employee a JOIN position b ON a.positionID = b.positionID'
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
              message: 'There is no employee!'
            })
          }
        }
      })
}