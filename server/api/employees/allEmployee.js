const db = require('../../db')

module.exports = (req,res) =>{
    const sql = `SELECT employeeID, employeeFirstName, employeeLastName, employeePhone, b.positionName
                 FROM employee a LEFT JOIN position b ON a.positionID = b.positionID
                 LEFT JOIN stock c ON a.stockID = c.stockID`
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
