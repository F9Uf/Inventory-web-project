const db = require('../../db');

module.exports = (req, res) => {
    const sql = `SELECT p.positionSpecific , ROUND(AVG(e.salary), 2) AS avgSalary
    FROM position p 
    LEFT JOIN employee e ON p.positionID = e.positionID
    GROUP BY p.positionSpecific;`;
    db.query(sql, (err,data) => {
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