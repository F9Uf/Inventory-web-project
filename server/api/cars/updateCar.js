const db = require('../../db');

module.exports = (req, res) => {
  const car = req.params.car_id;
  const area = req.body.carArea;
  const weight = req.body.weight;
  const status = req.body.carStatus;
  const licensePlate = req.body.licensePlate;
  const model = req.body.model;
  const sql = 'UPDATE car SET carArea = ?,weight = ?,carStatus = ?,licensePlate = ?,model = ? WHERE carID = ?'


  db.query(sql,[area,weight,status,licensePlate,model,car], (err, data) => {
    if (err) {
        console.log(err)
      return res.json({
        success: false,
        message: 'Update car error!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Update car successful!'
      })
    }
  })
}