const db = require('../../db');

module.exports = (req, res) => {
    const orderID = req.params.order_id;
    const sql = 'SELECT * FROM ordermain o LEFT JOIN orderdetail od ON o.orderID = od.orderID LEFT JOIN shop s ON o.shopID = s.shopID WHERE o.orderID = ?';
    db.query(sql,  [orderID],(err, data) => {
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