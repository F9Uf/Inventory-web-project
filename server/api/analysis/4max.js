const db = require('../../db');

module.exports = (req, res) => {
  const sql_group = `select a.shopID,max(a.countShopID) from (select o.shopID,count(o.shopID) as countShopID from ordermain o,orderdetail od,item i,category c where orderType = "out" and o.orderID=od.orderID and od.itemID = i.itemID and i.categoryID=c.categoryID group by o.shopID) as a`
  db.query(sql_group, (err, data) => { 
    if (err) {
        console.log(err)
      return res.json({success: false,message: 'Cannot query!'})
    } else {
      return res.json({success: true,message: 'Query success!',result:data})
    }
  })
}
