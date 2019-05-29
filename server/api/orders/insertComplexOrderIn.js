const db = require('../../db');

module.exports = (req, res) => {
    const newItem = req.body.newItem;
    const oldItem = req.body.oldItem;
    var orderID;
    var itemID = [];
    const sql_order = 'INSERT INTO ordermain VALUE (null, CURRENT_TIMESTAMP, "in", null)';
    const sql_orderDetail = 'INSERT INTO orderDetail (locationID, itemCount, itemID, orderID) VALUES ';
    const sql_item = 'INSERT INTO item';
    let resultFromDelete;
    let sql_value;
    let arr_value;

    //insert order
    db.query(sql_order, (err, data) => {
        if (err) {
            return res.json({
                success: false,
                message: 'Add order is error : ' + err 
            })
        } else {
            orderID = data.insertId;
            if(newItem) {
                let except_item = ['itemCount', 'locationID'];
                sql_value_item = valueCreate(newItem, 'newItem', [], except_item);
                db.query(sql_item + sql_value_item[0] + 'VALUES' + sql_value_item[1], sql_value_item[2], (err, data) =>{
                    if (err) {
                        resultFromDelete = deleteOrder(orderID);
                        return res.json({
                            success: false,
                            message: 'Add item is error !! : ' + err
                        })
                    } else {
                        for (let i = 0; i < data.affectedRows; i++) {
                            itemID.push(data.insertId + (10*i));
                        }
                        arr_value = [];
                        sql_value = ' ';
                        for (let i = 0 ; i < newItem.length ; i++) {
                            sql_value += '(?,?,?,?), ';
                            arr_value.push(eval('newItem' + '[' + i + '].' + 'locationID'));
                            arr_value.push(eval('newItem' + '[' + i + '].' + 'itemCount'));
                            arr_value.push(itemID[i]);
                            arr_value.push(orderID);
                        }
                        sql_value = sql_value.slice(0, -2);
                        db.query(sql_orderDetail + sql_value, arr_value, (err ,data) => {
                            if (err) {
                                resultFromDelete = deleteOrder(orderID);
                                resultFromDelete = deleteItem(itemID);
                                return res.json({
                                    sucess: false,
                                    message: 'Add order is error, Delete order and Item !! : '
                                })
                            }
                        })
                    }
                })
            }
            if (oldItem) {
                arr_value = [];
                sql_value = ' ';
                for (let i = 0 ; i < oldItem.length ; i++) {
                    sql_value += '(?,?,?,?), ';
                    arr_value.push(eval('oldItem' + '[' + i + '].' + 'locationID'));
                    arr_value.push(eval('oldItem' + '[' + i + '].' + 'itemCount'));
                    arr_value.push(eval('oldItem' + '[' + i + '].' + 'itemID'));
                    arr_value.push(orderID);
                }
                sql_value = sql_value.slice(0, -2);
                db.query(sql_orderDetail + sql_value, arr_value, (err ,data) => {
                    if (err) {
                        itemID = [];
                        let 
                        for (let i = 0; i < oldItem.length; i++) {
                            itemID.push(oldItem[i].itemID);
                        }
                        resultFromDelete = deleteOrder(orderID);
                        resultFromDelete = deleteItem(itemID);
                        return res.json({
                            sucess: false,
                            message: 'Add order is error, Delete order and item !! : '
                        })
                    } else {
                        return res.json({
                            success: true,
                            message: 'Add order is successful'
                        })
                    }
                })
            } else {
                resultFromDelete = deleteOrder(orderID);
                return res.json({
                    success: false,
                    message: 'There are no item'
                })
            }
        }
    })
    
    function valueCreate (data, dataName, id, except) {
        let sql_value = ' ';
        let sql_col = '(';
        let arr_value = [];
        let check = true;
        for (key in data[0]) {
            check = true;
            for (let j = 0 ; j < except.length ; j++) {
                if(`${key}` === except[j] ) {
                    check = false
                } 
            }
            if (check == true) {
                sql_col += `${key}, `;
            }
        }
        sql_col = sql_col.slice(0, -2);
        sql_col += ')'
        for (let i = 0 ; i < data.length ; i++) {
                sql_value += '(';
                for (key in data[i]) {
                    check = true;
                    for (let j = 0 ; j < except.length ; j++) {
                        if(`${key}` === except[j] ) {
                            check = false
                        } 
                    }
                    if (check === true) {
                        sql_value += '?, ';
                        arr_value.push(eval(dataName+'['+i+'].'+`${key}`));
                    }
                }
                for (let j = 0 ; j < id.length ; j++) {
                    sql_value += '?, ';
                    arr_value.push(eval(id[j]));
                }
                sql_value = sql_value.slice(0, -2);
                sql_value += '), ';
            }
            sql_value = sql_value.slice(0, -2);
            return [sql_col, sql_value, arr_value];
        }

        function deleteOrder (orderID) {
            db.query('DELETE FROM ordermain WHERE orderID = ?', [orderID], (err, data) => {
                if (err) {
                    return('Delete order is error !! : ' + err);
                } else {
                    return('Delete order is successful');
                }
            })
        }

        function deleteItem (itemID) {
            let sql_deleteItem = '(';
            for (let i = 0; i < itemID; i++) {
                sql_deleteItem += itemID[i] + ', ';
            } 
            sql_deleteItem = sql_deleteItem.slice(0, -2);
            sql_deleteItem += ')'
            db.query('DELETE FROM item WHERE itemID IN ' + sql_deleteItem, (err, data) => {
                if(err) {
                    return('Delete item is err !! : ') + err;
                } else {
                    return('Delete item is successful');
                }
            })
        }
}
