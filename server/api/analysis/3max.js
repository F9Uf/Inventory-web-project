const db = require('../../db');
module.exports = (req, res) => {
  const sql_group = `select a.categoryName,max(a.MaxcategoryName) from (select categoryName,count(categoryName) as MaxCategoryName from ordermain o,orderdetail od,item i,category c where orderType = "out" and o.orderID=od.orderID and od.itemID = i.itemID and i.categoryID=c.categoryID group by categoryName) as a`
  db.query(sql_group, (err, data) => { 
    if (err) {
        console.log(err)
      return res.json({success: false,message: 'Cannot query!'})
    } else {
      return res.json({success: true,message: 'Query success!',result:data})
    }
  })
}
