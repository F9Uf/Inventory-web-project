const db = require('../../db');

module.exports = (req, res) => {
  const sql_show = `select o.orderID,s.shopProvince,count(s.shopProvince) as CountProvince from ordermain o,shop s where o.shopID = s.shopID and orderType = 'out' group by s.shopProvince order by CountProvince Desc;`
  db.query(sql_show, (err, data) => { 
    if (err) {
      return res.json({success: false,message: 'Cannot query!'})
    } else {
      return res.json({success: true,message: 'Query success!',result:data })
    }
  })
}
