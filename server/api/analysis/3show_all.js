const db = require('../../db');

module.exports = (req, res) => {
  const sql_show = `select createAt,orderType,categoryName from ordermain o,orderdetail od,item i,category c where orderType = "out" and o.orderID=od.orderID and od.itemID = i.itemID and i.categoryID=c.categoryID;`
  db.query(sql_show, (err, data) => { 
    if (err) {
      return res.json({success: false,message: 'Cannot query!'})
    } else {
      return res.json({success: true,message: 'Query success!',result:data })
    }
  })
}
