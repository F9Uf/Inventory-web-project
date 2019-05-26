const db = require('../../db');

module.exports = (req, res) => {
    const Id= req.params.order_id;
    const type = req.body.orderType;
    const createAt = req.body.createAt;
    const shopID = req.body.shopID;
    const status = req.body.status;
    const shopName = req.body.shopName;
    const sql = 'UPDATE ordermain SET o.orderType = ?,o.createAt = ?,o.shopID = ?,s.shopID = ? ,od.status = ?,s.shopName = ? FROM ordermain o,orderdetail od,shop s WHERE o.orderID = od.orderID AND o.shopID = s.shopID AND o.orderID = ?;'


  db.query(sql,[type,createAt,shopID,shopID,status,shopName,Id], (err, data) => {
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