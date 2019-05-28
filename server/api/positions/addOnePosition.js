const db = require('../../db');

module.exports = (req, res) => {
  const posName = req.body.posName;
   const sql = 'INSERT INTO POSITION VALUES(null,?)'

  

  db.query(sql,[posName], (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Add 1 position is error!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Add 1 position is successful!'
      })
    }
  })
}
