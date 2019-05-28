const db = require('../../db')

module.exports = (req,res) =>{

  let sql = 'SELECT employeeID, employeeFirstName, employeeLastName, employeePhone, b.positionName FROM employee a LEFT JOIN position b ON a.positionID = b.positionID LEFT JOIN stock c ON a.stockID = c.stockID'
  let sql_value = []

  if (Object.keys(req.query).length) {
    // have query
    sql += ' WHERE '
    for (key in req.query) {
      sql += `${key} = ? AND `
      sql_value.push(req.query[key])
    }
    sql = sql.slice(0, -4)
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
