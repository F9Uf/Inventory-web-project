const db = require('../../db');

module.exports = (req, res) => {
  const sql = `SELECT DISTINCT o.orderID,o.createAt,o.orderType,o.shopID,s.shopName,(SELECT IF((SELECT count(*) FROM orderdetail GROUP BY orderID,status HAVING status LIKE 'wait') > 0, 'wait', IF((SELECT count(*) FROM orderdetail GROUP BY orderID,status HAVING status LIKE 'delivering') > 0, 'delivering', 'done'))) AS status
  FROM ordermain o LEFT JOIN shop s 
  ON o.shopID = s.shopID;`
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