const db = require('../../db');

module.exports = (req, res) => {
    const sql = `SELECT s.*, SUM((a.maxArea - IF(area > 0, area, 0))) AS leftArea
    FROM ( 
    SELECT l.locationID, l.locationName, l.stockID, l.maxArea, SUM(i.area * od.itemCount) as area 
    FROM orderdetail od
    RIGHT JOIN location l ON od.locationID = l.locationID
    LEFT JOIN item i ON od.itemID = i.itemID
    GROUP BY l.locationID
    ) as a LEFT JOIN stock s ON a.stockID = s.stockID
    GROUP BY s.stockID;`
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