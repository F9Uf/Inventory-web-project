const db = require('../../db');
const conditionQuery = require('../../services/queryToStringCondition');

module.exports = (req, res) => {
    const orderID = req.params.order_id;
    let sql = 'SELECT * FROM ordermain o LEFT JOIN orderdetail od ON o.orderID = od.orderID LEFT JOIN shop s ON o.shopID = s.shopID';
    let condition = conditionQuery(req.query);
    let value_arr = [];
    if (condition) {
        sql += condition.sql + 'AND ';
        value_arr = condition.value_array;
    }
    sql += 'orderID = ?';
    value_arr.push(orderID);
    db.query(sql,  value_arr, (err, data) => {
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