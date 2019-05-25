const db = require('../../db');

module.exports = (req, res) => {
    const itemName = req.body.itemName;
    const category = req.body.category;
    const weight = req.body.weight;
    const area = req.body.area;
    const supplierName = req.body.supplierName;
    const sql = 'INSERT INTO item VALUE (null, ?, ?, ?, ?, (SELECT supplierID FROM supplier WHERE supplierName LIKE ?))';

    db.query(sql,[itemName, category, weight, area, supplierName], (err, data) => {
        if (err) {
            return res.json({
                success: false,
                message: err
            }) 
        } else {
            return res.json({
                success: true,
                message: 'Add 1 item is ssuccessful!',
            })
        }
    })
}