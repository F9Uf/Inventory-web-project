const db = require('../../db');

module.exports = (req, res) => {
    const orderType = req.body.orderType;
    const oldShop = req.body.oldShop;
    const newShop = req.body.newShop;
    const oldItem = req.body.oldItem;
    const newItem = req.body.newItem;
    var orderID;
    const sql_order = 'INSERT INTO ordermain VALUE (null, CURRENT_TIMESTAMP, ?, ?)';
    let sql_orderDetail = 'INSERT INTO orderDetail (locationID, itemID, itemCount, orderID) VALUES ';
    let sql_value_orderDetail = [];

    if (oldShop) {
        db.query(sql_order, [orderType, oldShop], (err, data) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Add order is error : ' + err 
                })
            } else {
                orderID = data.insertId;
                console.log(orderID);
                if (oldItem) {
                    sql_value_orderDetail = valueOrderDetailCreate(oldItem);
                    console.log(sql_value_orderDetail[0]);
                    console.log(sql_value_orderDetail[1]);
                    sql_orderDetail += sql_value_orderDetail[0];
                        db.query(sql_orderDetail + sql_value_orderDetail[0], sql_value_orderDetail[1], (err ,data) => {
                            if (err) {
                                return res.json({
                                    message: err
                                })
                            } else {
                                return res.json({
                                    success: true,
                                    message: 'Add order is successful'
                                })
                            }
                        })
                    }
                }
        })
    } else {
        return res.json({
            success: false,
            message: 'There are no shop'
        })
    }
    
    
    function deleteOrder(orderID) {
        db.query('DELETE FROM ordermain WHERE orderID = ?', [orderID], (err, data) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Delete order is error !! : ' + err
                })
            } else {
                return res.json({
                    success: true,
                    message: 'Delete order is successful'
                })
            }
        })
    }

   function valueOrderDetailCreate(data) {
    let sql_value = ' ';
    let arr_value = [];
    for (let i = 0 ; i < data.length ; i++) {
            sql_value += '(';
            for (key in data[i]) {
                sql_value += '?, ';
                arr_value.push('oldItem['+i+'].'+`${key}`);
            }
            sql_value += 'orderID), ';
            arr_value.push(orderID);
        }
    for (let i = 0 ; i < arr_value.length ; i++) {
        console.log(arr_value[i]);
    }
        sql_value = sql_value.slice(0, -2);
        return [sql_value, arr_value];
    }
}

