const db = require('../../db');

module.exports = (req, res) => {
  const supName = req.body.supplierName;
  const supAddress = req.body.supplierAddress;
  const supPhone = req.body.supplierPhone;
  const supEmail = req.body.supplierEmail;
  const sql = 'INSERT INTO supplier VALUES(null,?,?,?,?)'

  

  db.query(sql,[supName,supAddress,supPhone,supEmail], (err, data) => {
    if (err) {
        return res.json({
        success: false,
        message: 'Add 1 supplier is error!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Add 1 supplier is successful!'
      })
    }
  })
}