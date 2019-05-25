const db = require('../../db');
module.exports = (req, res) => {
  const item = req.params.item_id; 
  const sql = `SELECT i.itemID,i.itemName,SUM(o.itemCount) AS totalCount,i.weight,i.area,i.supplierID,o.locationID FROM item i LEFT JOIN orderdetail o ON i.itemID = o.itemID WHERE i.itemID = ? GROUP BY o.itemID`
  db.query(sql,[item],(err,data) => {
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
