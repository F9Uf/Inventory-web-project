const db = require('../../db');

module.exports = (req, res) => {
  const sql_group = `select o.shopID,count(o.shopID) as countShopID from ordermain o,orderdetail od,item i,category c where orderType = "out" and o.orderID=od.orderID and od.itemID = i.itemID and i.categoryID=c.categoryID group by o.shopID;`
  db.query(sql_group, (err, data) => { 
    if (err) {
      return res.json({success: false,message: 'Cannot query!'})
    } else {
      return res.json({success: true,message: 'Query success!',result:data})
    }
  })
}
