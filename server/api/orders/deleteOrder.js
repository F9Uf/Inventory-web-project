const db = require('../../db');

module.exports = (req, res) => {
    const id = req.params.order_id;
    const sql = 'DELETE FROM ordermain WHERE orderID = ?'
    db.query(sql, [id], (err, data) => {
        if(err) {
            return res.json({
                success: false,
                message: 'Delete order error !!'
            })
        } else {
            return res.json({
                success: true,
                message: 'Delete order complete!'
            })
        }
    }) 
}