const db = require('../../db');

module.exports = (req, res) => {
    const catId= req.params.category_id;
    const sql = 'DELETE FROM category WHERE categoryID = ?'
    
    db.query(sql, [catId], (err, data) => {
        if(err) {
            return res.json({
                success: false,
                message: 'Delete 1 category is error!'
            })

        } else {
            return res.json({
                success: true,
                message: 'Delete 1 category complete!'
            })
        }
    }) 
}