const db = require('../../db')
const qtsc = require('../../services/queryToStringCondition')

module.exports = (req,res) =>{

  let sql = 'SELECT employeeID, employeeFirstName, employeeLastName, employeePhone, b.positionName FROM employee a LEFT JOIN position b ON a.positionID = b.positionID LEFT JOIN stock c ON a.stockID = c.stockID'
  let sql_value = []

  const query = qtsc(req.query)

  if (query) {
    sql += query.sql
    sql_value = query.value_array
  }

  db.query(sql, sql_value, (err, data) => {
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
