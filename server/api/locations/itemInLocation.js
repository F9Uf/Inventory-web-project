const db = require('../../db');

module.exports = (req, res) => {
  const id = req.params.item_id;
  const sql = `select l.*, sum(od.itemCount) AS itemCount
  from orderdetail od 
  LEFT JOIN item i ON od.itemID = i.itemID
  LEFT JOIN location l ON od.locationID = l.locationID
  GROUP BY l.locationID, i.itemID
  HAVING i.itemID = ?;`
  db.query(sql, [id],(err, data) => {
    if (err) {
      
      return res.json({
        success: false,
        message: 'Error !!'
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