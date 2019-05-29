const db = require('../../db');

module.exports = (req, res) => {
    const sql = `SELECT s.*, MAX(count), a.categoryName
    FROM (
    SELECT i.supplierID, c.categoryName, COUNT(*) AS count
    FROM item i 
    LEFT JOIN category c ON i.categoryID = c.categoryID
    GROUP BY i.supplierID, c.categoryName
    ) AS a LEFT JOIN supplier s ON a.supplierID = s.supplierID
    GROUP BY s.supplierID;`
    
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({
                success: false,
                message: 'ERROR !!'
            })
        } else {
            return res.json({
                success: true,
                message: 'Successful',
                result: data
            })
        }
    })
}