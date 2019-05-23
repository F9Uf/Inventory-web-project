const db = require('../../db');

module.exports = (req, res) => {
  const sql = 'SELECT a.itemID, itemName, SUM(itemCount), category FROM item a, orderdetail b WHERE shippingID IS NULL GROUP BY itemID'

  db.query(sql, (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: err
      })
    } else {
      if (data && data[0]) {
        return res.json({
          success: true,
          message: 'Successfully found the items',
          result: data
        })
      } else {
        return res.json({
          success: false,
          message: 'There are no items'
        })
      }
    }
  })
}
