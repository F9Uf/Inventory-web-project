const db = require('../../db');

module.exports = (req, res) => {
  const stockID = req.body.stockID;
  const maxArea = req.body.maxArea;
  const locationName = req.body.locationName;
  const sql = 'INSERT INTO location VALUES(null,?,?,?)'
 

  db.query(sql,[stockID,maxArea,locationName], (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Add 1 location is error!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Add 1 location is successful!'
      })
    }
  })
}
