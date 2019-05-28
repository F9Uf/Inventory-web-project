const db = require('../../db');

module.exports = (req, res) => {
    const posId= req.params.position_id;
    const posName = req.body.posName;
    const sql = 'UPDATE position SET positionName = ? WHERE positionID = ?'


  db.query(sql,[posName,posId], (err, data) => {
    if (err) {
        console.log(err)
      return res.json({
        success: false,
        message: 'Update position is error!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Update position is successful!'
      })
    }
  })
}