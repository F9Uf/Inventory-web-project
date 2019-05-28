const db = require('../../db');

module.exports = (req, res) => {
  const addressDetail = req.body.addressDetail;
  const subDistrict = req.body.subDistrict;
  const district = req.body.district;
  const province = req.body.province;
  const postalCode = req.body.postCode;
  const sql = 'INSERT INTO address(addressID,addressDetail,subDistrict,district,province,postCode) VALUES(null,?,?,?,?,?)'

  db.query(sql,[addressDetail,subDistrict,district,province,postalCode], (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Add 1 car is error!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Add 1 car is successful!'
      })
    }
  })
}