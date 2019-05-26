const db = require('../../db');

module.exports = (req, res) => {
  const sql = 'SELECT * FROM location'
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
          message: 'Successfully found location!',
          result: data
        })
      } else {
        // if not found
        return res.json({
          success: false,
          message: 'Failed, not found location!'
        })
      }
    }
  })
}