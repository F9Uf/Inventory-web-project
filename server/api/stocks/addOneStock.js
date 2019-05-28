const db = require('../../db');

module.exports = (req, res) => {
  const stockName = req.body.stockName;
  const sql = 'INSERT INTO STOCK VALUES(null,?)'

  

  db.query(sql,[stockName], (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Add 1 stock is error!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Add 1 stock is successful!'
      })
    }
  })
}
