const db = require('../../db');

module.exports = (req, res) => {
  const sql = 'SELECT * FROM stock'

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
          message: 'Successfully found the stocks!',
          result: data
        })
      } else {
        // if not found
        return res.json({
          success: false,
          message: 'There is no stock!'
        })
      }
    }
  })
}
