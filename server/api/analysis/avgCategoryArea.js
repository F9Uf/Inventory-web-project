const db = require('../../db');

module.exports = (req, res) => {
  const sql_group = `select c.categoryName, round(avg(area), 2) from item i,category c where i.categoryID = c.categoryID group by i.categoryID;`
  db.query(sql_group, (err, data) => { 
    if (err) {
      return res.json({success: false,message: 'Cannot query!'})
    } else {
      return res.json({success: true,message: 'Query success!',result:data})
    }
  })
}
