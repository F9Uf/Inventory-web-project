const db = require('../../db');

module.exports = (req, res) => {
    const id = req.params.stock_id;
    const sql = 'DELETE FROM stock WHERE stockID = ?'
    
    db.query(sql, [id], (err, data) => {
        if(err) {
            return res.json({
                success: false,
                message: err
            })

        } else {
            return res.json({
                success: true,
                message: 'Delete complete!'
            })
        }
    }) 
}