const db = require('../../db');

module.exports = (req, res) => {
  const area = req.body.carArea;
  const weight = req.body.carWeight;
  const licensePlate = req.body.licensePlate;
  const model = req.body.model;
  const sql = 'INSERT INTO car VALUES(null,?,?,"ready",?,?)'

  db.query(sql,[area,weight,licensePlate,model], (err, data) => {
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
