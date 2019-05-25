const db = require('../../db');

module.exports = (req, res) => {
    const catId= req.params.catId;
    const sql = 'DELETE FROM category WHERE categoryID = ?'
    
    db.query(sql, [catId], (err, data) => {
        if(err) {
            return res.json({
                success: false,
                message: err
            })

        } else {
            return res.json({
                success: true,
                message: 'Delete 1 car complete!'
            })
        }
    }) 
}