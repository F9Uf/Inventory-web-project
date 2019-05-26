const db = require('../../db');

module.exports = (req, res) => {
    const posId= req.params.position_id;
    const sql = 'DELETE FROM position WHERE positionID = ?'
    
    db.query(sql, [posId], (err, data) => {
        if(err) {
            return res.json({
                success: false,
                message: 'Delete 1 position is error!'
            })

        } else {
            return res.json({
                success: true,
                message: 'Delete 1 position complete!'
            })
        }
    }) 
}