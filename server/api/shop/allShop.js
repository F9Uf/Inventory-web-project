const db = require('../../db');

module.exports = (req, res) => {
  const sql = 'SELECT * FROM shop'
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
          message: 'Successfully found shop!',
          result: data
        })
      } else {
        // if not found
        return res.json({
          success: false,
          message: 'Failed, not found shop!'
        })
      }
    }
  })
}