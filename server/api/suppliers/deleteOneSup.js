const db = require('../../db');

module.exports = (req, res) => {
    const id = req.params.supplier_id;
    const sql = 'DELETE FROM supplier WHERE supplierID = ?'
    
    db.query(sql, [id], (err, data) => {
        if(err) {
            return res.json({
                success: false,
                message: err
            })

        } else {
            return res.json({
                success: true,
                message: 'Delete supplier is complete!'
            })
        }
    }) 
}