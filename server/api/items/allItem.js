const db = require('../../db');

module.exports = (req, res) => {
  const sql = `SELECT DISTINCT a.itemID, a.itemName, SUM(b.itemCount) as totalCount, a.categoryID, a.area, a.itemWeight, (SELECT COUNT(*) FROM item) AS count
  FROM item a 
  LEFT JOIN orderdetail b ON a.itemID = b.itemID 
  GROUP BY a.itemID;`

  db.query(sql, (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: err
      })
    } else {
      if (data && data[0]) {
        for (let i = 0 ; i < data.length ; i++) {
          if (data[i].totalCount == null) {
            data[i].totalCount = 0;
          }
        }
        return res.json({
          success: true,
          message: 'Successfully found the items!',
          result: data
        })
      } else {
        return res.json({
          success: false,
          message: 'There is no the item.'
        })
      }
    }
  })
}
