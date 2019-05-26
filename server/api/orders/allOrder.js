const db = require('../../db');

module.exports = (req, res) => {
  const sql = `select o.orderID, o.createAt, o.orderType, o.shopID, s.shopName FROM order o LEFT JOIN shop s ON o.shopID = s.shopID;`
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
          message: 'Successfully!',
          result: data
        })
      } else {
        // if not found
        return res.json({
          success: false,
          message: 'Fail!'
        })
      }
    }
  })
}