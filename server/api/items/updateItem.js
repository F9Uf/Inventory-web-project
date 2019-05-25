const db = require('../../db');

module.exports = (req, res) => {
  const id = req.params.item_id;
  const itemName = req.body.itemName;
  const category = req.body.category;
  const weight = req.body.weight;
  const area = req.body.area;
  const supplierName = req.body.supplierName;
  const sql = 'UPDATE item SET itemName = ?, category = ?, weight = ?, area = ?, supplierID = (SELECT supplierID FROM supplier WHERE supplierName LIKE ?) WHERE itemID = ?;'

  db.query(sql,[itemName,category,weight,area,supplierName,id], (err, data) => {
    if (err) {
        console.log(err)
      return res.json({
        success: false,
        message: err
      })
    } else {
      return res.json({
        success: true,
        message: 'Update item successful!'
      })
    }
  })
}