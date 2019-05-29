const db = require('../../db');

module.exports = (req, res) => {
  const sql_show = `select i.supplierID,s.supplierName,count(i.supplierID) as countItems from supplier s,item i where s.supplierID = i.supplierID group by i.supplierID;`
  db.query(sql_show, (err, data) => { 
    if (err) {
      return res.json({success: false,message: 'Cannot query!'})
    } else {
      return res.json({success: true,message: 'Query success!',result:data })
    }
  })
}
