const db = require('../../db');

module.exports = (req, res) => {
  const carID = req.body.carID;
  const employeeID = req.body.employeeID;
  const shippingDate = req.body.shippingDate;
  const sql = 'INSERT INTO SHIPPING VALUES(null,?,?,?)'

  

  db.query(sql,[carID,employeeID,shippingDate], (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: err
      })
    } else {
      return res.json({
        success: true,
        message: 'Add 1 shipping is successful!'
      })
    }
  })
}
