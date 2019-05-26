const db = require('../../db');

module.exports = (req, res) => {
  const sql = 'SELECT * FROM location'
  db.query(sql, (err, data) => {
    if (err) {
        console.log(err)
      return res.json({
        success: false,
        message: 'Can\'t query'
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