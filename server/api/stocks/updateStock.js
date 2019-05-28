const db = require('../../db');

module.exports = (req, res) => {
  const stockID = req.params.stock_id;
  const stockName = req.body.stockName;
    const sql = 'UPDATE stock SET stockName = ? WHERE stockID = ?'


  db.query(sql,[stockName,stockID], (err, data) => {
    if (err) {
        console.log(err)
      return res.json({
            success: false,
            message: 'Update stock is error!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Update stock is successful!'
      })
    }
  })
}