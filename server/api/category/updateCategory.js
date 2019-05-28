const db = require('../../db');

module.exports = (req, res) => {
    const catId= req.params.category_id;
    const catName = req.body.catName;
    const sql = 'UPDATE category SET categoryName = ? WHERE categoryID = ?'


  db.query(sql,[catName,catId], (err, data) => {
    if (err) {
        console.log(err)
      return res.json({
        success: false,
        message: 'Update category is error!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Update category is successful!'
      })
    }
  })
}