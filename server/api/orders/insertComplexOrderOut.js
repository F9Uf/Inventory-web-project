const db = require('../../db');

module.exports = (req, res) => {
    const oldShop = req.body.oldShop;
    const newShop = req.body.newShop;
    const orderDetail = req.body.orderDetail;
    const sql_newShop = 'INSERT INTO shop VALUE (null,?,?,?,?,?,?,?)';
    const sql_order = 'INSERT INTO ordermain VALUE (null,CURRENT_TIMESTAMP,"out",?)';
    const sql_orderDetail = 'INSERT INTO orderDetail (locationID, itemCount, itemID, orderID) VALUES ';
    var shopID;
    var orderID;
    var checkOrder = [];
    let temp;
    let resultFromDelete;
    /*for (let i = 0; i < orderDetail.length, i++) {
        checkOrder.push('{'+orderDetail[i].itemID+','+orderDetail[i].locationID+'}');
        for (let j = 0; j < checkOrder.length - 1; j++) {
            temp = '{'+orderDetail[i].itemID+','+orderDetail[i].locationID+'}';
            console.log(temp);
            console.log(checkOrder[j]);
            if (temp === checkOrder[j]) {
                return res.json({
                    success: false,
                    message: 'Duplicate order !!'
                })
            }
        }
    }*/
    if (oldShop) {
        db.query(sql_order, [oldShop.shopID], (err, data) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Add order is error !! : '
                })
            } else {
                orderID = data.insertId;
                arr_value = [];
                sql_value = ' ';
                for (let i = 0 ; i < orderDetail.length ; i++) {
                    sql_value += '(?,?,?,?), ';
                    arr_value.push(eval('orderDetail' + '[' + i + '].' + 'locationID'));
                    arr_value.push(eval('orderDetail' + '[' + i + '].' + 'itemCount'));
                    arr_value.push(eval('orderDetail' + '[' + i + '].' + 'itemID'));
                    arr_value.push(orderID);
                }
                sql_value = sql_value.slice(0, -2);
                db.query(sql_orderDetail + sql_value, arr_value, (err ,data) => {
                    if (err) {
                        resultFromDelete = deleteOrder(orderID);
                        return res.json({
                            sucess: false,
                            message: 'Add order is error, Delete order and Item !! : '
                        })
                    } else {
                        return res.json({
                            success: true,
                            message: 'Add order is successful'
                        })
                    }
                })
            }
        })
    } else {
        if (newShop) {
            db.query(sql_newShop, [newShop.shopName, newShop.shopAddress, newShop.shopSubDistrict, newShop.shopDistrict, newShop.shopProvince, newShop.shopPostalCode, newShop.shopPhone] , (err, data) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Add shop is error !! : '
                    })
                } else {
                    shopID = data.insertId;
                    db.query(sql_order, [shopID], (err, data) => {
                        if (err) {
                            resultFromDelete = deleteShop(shopID);
                            return res.json({
                                success: false,
                                message: 'Add order is error !! : '
                            })
                        } else {
                            orderID = data.insertId;
                            arr_value = [];
                            sql_value = ' ';
                            for (let i = 0 ; i < orderDetail.length ; i++) {
                                sql_value += '(?,?,?,?), ';
                                arr_value.push(eval('orderDetail' + '[' + i + '].' + 'locationID'));
                                arr_value.push(eval('orderDetail' + '[' + i + '].' + 'itemCount'));
                                arr_value.push(eval('orderDetail' + '[' + i + '].' + 'itemID'));
                                arr_value.push(orderID);
                            }
                            sql_value = sql_value.slice(0, -2);
                            db.query(sql_orderDetail + sql_value, arr_value, (err ,data) => {
                                if (err) {
                                    resultFromDelete = deleteOrder(orderID);
                                    resultFromDelete = deleteShop(shopID);
                                    return res.json({
                                        sucess: false,
                                        message: 'Add order is error, Delete order and Item !! : '
                                    })
                                } else {
                                    return res.json({
                                        success: true,
                                        message: 'Add order is successful'
                                    })
                                }
                            })
                        }
                    })
                }
            })
        } else {
            return res.json({
                success: false,
                message: 'There are no shop data !!'
            })
        }
    }
    function deleteOrder (orderID) {
        db.query('DELETE FROM ordermain WHERE orderID = ?', [orderID], (err, data) => {
            if (err) {
                return('Delete order is error !! : ');
            } else {
                return('Delete order is successful');
            }
        })
    }
    function deleteShop (shopID) {
        db.query('DELETE FROM shop WHERE shopID = ?', shopID, (err, data) => {
            if(err) {
                return('Delete shop is err !! : ');
            } else {
                return('Delete shop is successful');
            }
        })
    }
}