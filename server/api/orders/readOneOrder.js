const db = require('../../db');
const queryToStringCondition = require('../../services/queryToStringCondition');

module.exports = (req, res) => {
    const orderID = req.params.order_id;
    let sql = `
    SELECT DISTINCT o.orderID, o.orderType, o.shopID, od.orderDetailID, od.status, od.itemCount, l.locationID, l.locationName, od.shippingID
    FROM orderdetail od
    LEFT JOIN ordermain o ON od.orderID = o.orderID
    LEFT JOIN location l ON od.locationID = l.locationID
    LEFT JOIN item i ON od.itemID = i.itemID`
    const condition = queryToStringCondition(req.query);
    let value_arr = [];
    if (condition) {
        sql += condition.sql + ' AND ';
        value_arr = condition.value_array;
    } else {
        sql += ' WHERE ';
    }
    sql += 'od.orderID = ?';
    value_arr.push(orderID);
    db.query(sql, value_arr, (err, data) => {
        if (err) {
            return res.json({
                success: false,
                message: 'Read one order is error !! : ' + err
            })
        } else {
            return res.json({
                success: true,
                message: 'Read one order is successful',
                result: data
            })
        }
            
    })
}