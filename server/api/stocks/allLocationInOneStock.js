const db = require('../../db');

module.exports = (req, res) => {
    const stockID = req.params.stockID;
    const sql = 'SELECT * FROM Location Where stockID = ?'
    db.query(sql, [stockID], (err, data) => {
        if(err) {
            return res.json({
                success: false,
                message: err
            })
        } else {
            if (data) {
                return res.json({
                    success: true,
                    message: 'Successfully found all location in one stock!',
                    result: data
                })
            } else {
                return res.json({
                    success: false,
                    message: 'Fail, not found all location in one stock!'
                })
            }
        }
    })
}