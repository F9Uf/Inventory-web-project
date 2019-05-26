const db = require('../../db');

module.exports = (req, res) => {
    const locationId = req.params.location_id;
    const sql = 'DELETE FROM location WHERE locationID = ?'
    
    db.query(sql, [locationId], (err, data) => {
        if(err) {
            return res.json({
                success: false,
                message: 'Delete 1 location is error!'
            })

        } else {
            return res.json({
                success: true,
                message: 'Delete 1 location is complete!'
            })
        }
    }) 
}