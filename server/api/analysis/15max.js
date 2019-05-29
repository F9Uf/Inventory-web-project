const db = require('../../db');

module.exports = (req, res) => {
  const sql = `select stockName, max(countEmployee) as MaxEmployee from (select s.stockName,count(employeeID) as countEmployee
  from employee e, stock s
  where e.stockID = s.stockID
  group by e.stockID) as a`;

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
          message: 'Successfully queried!',
          result: data
        })
      } else {
        // if not found
        return res.json({
          success: false,
          message: 'Don\'t query'
        })
      }
    }
  })
}
