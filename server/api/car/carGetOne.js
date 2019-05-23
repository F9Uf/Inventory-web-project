const db = require('../../db');

module.exports = (req, res) => {
  const id = req.params.carID;
  const sql = 'SELECT * FROM car WHERE carID = ?'

  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: err
      })
    } else {
      if (data && data[0]) {
        // if found carID
        return res.json({
          success: true,
          message: 'Successfully found the car',
          result: data[0]
        })
      } else {
        // if not found
        return res.json({
          success: false,
          message: 'Car not found!'
        })
      }
    }
  })
}

