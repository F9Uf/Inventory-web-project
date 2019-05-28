const db = require('../../db');

module.exports = (req, res) => {
    const id = req.params.item_id;
    const sql = 'DELETE FROM item WHERE itemID = ?'
    
    db.query(sql, [id], (err, data) => {
        if(err) {
            return res.json({
                success: false,
                message: err
            })

        } else {
            return res.json({
                success: true,
                message: 'Delete the item is complete!'
            })
        }
    }) 
}