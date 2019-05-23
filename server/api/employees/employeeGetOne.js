const db = require('../../db');

module.exports = (req, res) => {
  const id = req.params.employee_id;
  const sql = 'SELECT * FROM employee WHERE employeeID = ?'

  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: err
      })
    } else {
      if (data && data[0]) {
        // if found employeeID
        return res.json({
          success: true,
          message: 'Successfully found the user',
          result: data[0]
        })
      } else {
        // if not found
        return res.json({
          success: false,
          message: 'User not found!'
        })
      }
    }
  })
}

