const db = require('../../db');

module.exports = (req, res) => {
  const catName = req.body.catName;
   const sql = 'INSERT INTO CATEGORY VALUES(null,?)'

  

  db.query(sql,[catName], (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Add 1 category is eror!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Add 1 category is successful!'
      })
    }
  })
}
