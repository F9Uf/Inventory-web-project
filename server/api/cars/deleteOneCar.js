const db = require('../../db');

module.exports = (req, res) => {
    const id = req.params.carID;
    const sql = 'DELETE FROM car WHERE carID = ?'
    
    db.query(sql, [id], (err, data) => {
        if(err) {
            return res.json({
                success: false,
                message: 'Delete is error!!'
            })

        } else {
            return res.json({
                success: true,
                message: 'Delete complete!'
            })
        }
    }) 
}