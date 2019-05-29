const db = require('../../db');

module.exports = (req, res) => {
  const name = req.body.shopName;
  const address = req.body.shopAddress;
  const subDistrict = req.body.shopSubDistrict;
  const district = req.body.shopDistrict;
  const province = req.body.shopProvince;
  const postalCode = req.body.shopPostalCode;
  const phone = req.body.shopPhone;
  const sql = 'INSERT INTO shop VALUES(null,?,?,?,?,?,?,?)'
 

  db.query(sql,[name,address,subDistrict,district,province,postalCode,phone], (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Add 1 shop is error!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Add 1 shop is successful!'
      })
    }
  })
}
