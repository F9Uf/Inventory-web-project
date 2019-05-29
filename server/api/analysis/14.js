const db = require('../../db');

module.exports = (req, res) => {
  const sql = `select shopName, count(orderID) as CountOrder
  from ordermain o, shop s
  where o.shopID = s.shopID and orderType = "out"
  group by o.shopID
  order by CountOrder desc`;

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
