const db = require('../../db');

module.exports = (req, res) => {
  const id = req.params.item_id;
  const itemName = req.body.itemName;
  const category = req.body.category;
  const weight = req.body.weight;
  const area = req.body.area;
  const supplier = req.body.supplierID;
  const sql = 'UPDATE itemNa'


  db.query(sql,[area,weight,status,licensePlate,model,car], (err, data) => {
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