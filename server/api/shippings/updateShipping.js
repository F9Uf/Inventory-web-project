const db = require('../../db');

module.exports = (req, res) => {
    const shippingId= req.params.shippingId;
    const carID = req.body.carID;
    const employeeID = req.body.employeeID;
    const shippingDate = req.body.shippingDate;
    const sql = 'UPDATE shipping SET carID = ?, employeeID = ?, shippingDate = ? WHERE shippingID = ?'


  db.query(sql,[carID,employeeID,shippingDate,shippingId], (err, data) => {
    if (err) {
        console.log(err)
      return res.json({
        success: false,
        message: 'Update shipping is error!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Update shipping is successful!'
      })
    }
  })
}