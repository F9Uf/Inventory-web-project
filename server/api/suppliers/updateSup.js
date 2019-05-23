const db = require('../../db');

module.exports = (req, res) => {
  const sup = req.params.sup_id;
  const name = req.body.supplierName;
  const address = req.body.supplierAddress;
  const phone = req.body.supplierPhone;
  const email = req.body.supplierEmail;

  const sql = 'UPDATE supplier SET supplierName = ?,supplierAddress = ?,supplierPhone = ?,supplierEmail = ? WHERE supplierID = ?'


  db.query(sql,[name,address,phone,email,sup], (err, data) => {
    if (err) {
        console.log(err)
      return res.json({
        success: false,
        message: 'Update error!!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Update successful!'
      })
    }
  })
}