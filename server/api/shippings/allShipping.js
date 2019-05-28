const db = require('../../db');

module.exports = (req, res) => {
    const sql = 'SELECT * FROM shipping'
    db.query(sql, (err, data) => {
        if(err) {
            return res.json({
                success: false,
                message: err
            })
        } else {
            if (data) {
                return res.json({
                    success: true,
                    message: 'Successfully fond shipping!',
                    result: data
                })
            } else {
                return res.json({
                    success: false,
                    message: 'Fail, not found shipping!'
                })
            }
        }
    })
}