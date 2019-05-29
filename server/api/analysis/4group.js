const db = require('../../db');

module.exports = (req, res) => {
  const sql_group = `select s.shopID, s.shopName, count(*) as countShopID
  from ordermain o, shop s
  where o.shopID = s.shopID
  group by o.shopID;`
  db.query(sql_group, (err, data) => { 
    if (err) {
      return res.json({success: false,message: 'Cannot query!'})
    } else {
      return res.json({success: true,message: 'Query success!',result:data})
    }
  })
}
