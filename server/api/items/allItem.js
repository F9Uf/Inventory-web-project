const db = require('../../db');

module.exports = (req, res) => {
  const sql = 'SELECT DISTINCT a.itemID, itemName, SUM(itemCount) as totalCount, category FROM item a JOIN orderdetail b ON a.itemID = b.itemID WHERE shippingID IS NULL GROUP BY a.itemID'

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
