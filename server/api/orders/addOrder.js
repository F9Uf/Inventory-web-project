const db = require('../../db');

module.exports = (req, res) => {
  const orderType = req.body.orderType;
  const shopID = req.body.shopID;
  const orderdetail = req.body.orderDetail;
  const sql_ordermain = `INSERT INTO ordermain(orderID,orderType,shopID,createAt) VALUES (null,?,?,CURRENT_TIMESTAMP) ;`
  const sql_orderdetail = `INSERT INTO orderdetail(orderdetailID,itemCount,locationID,itemID,orderID) VALUES (null,?,?,?,?);`
  const id = req.params.order_id;
  const newUpdate = req.body
  
  db.query(sql_ordermain,[orderType,shopID]);
  let sql_Update = 'INSERT INTO orderdetail(orderdetailID,itemCount,locationID,itemID,orderID) VALUES'
  
  sql_value = sql_value.slice(0, -2)
  arr_value.push(id) 
  db.query(sql_Update + sql_value, arr_value, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: 'Update order is error!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Update order is successful!'
      })
    }
  }) 
  
  




/*  db.query(sql_ordermain,[orderType,shopID], (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: err
      })
    } else {
      const newId = data.insertId;
      createOrderdetail(newId)
    }
  })

const createOrderdetail = (orderdetail) => {
  for(var k=0;k < orderdetail.length ; k++)
  {
      db.query(sql_orderdetail,[orderdetail[k].itemCount,orderdetail[k].locationID,orderdetail[k].itemID,newId], (err, data) => {
      if (err) {
        console.log(newId);
        return res.json({
          success: false,
          message: err
        })
      } else {
        return res.json({
          success: true,
          message: 'Add 1 car is successful!'
        })
      }
    })
  }
}*/

 
}
