const db = require('../../db');

module.exports = (req, res) => {
    const sql = `  SELECT a.locationID, a.locationName, s.stockName, ROUND((a.maxArea - IF(area > 0, area, 0)), 2) AS area
        FROM ( 
        SELECT l.locationID, l.locationName, l.stockID, l.maxArea, SUM(i.area * od.itemCount) as area 
        FROM orderdetail od
        RIGHT JOIN location l ON od.locationID = l.locationID
        LEFT JOIN item i ON od.itemID = i.itemID
        GROUP BY l.locationID
    ) as a LEFT JOIN stock s ON a.stockID = s.stockID;
    select *
    from item
    where itemID = 000000000000006;`
    
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({
                success: false,
                message: 'Err !! : ' + err
            })
        } else {
            return res.json({
                success: true,
                message: 'Success',
                result: data
            })
        }
    })
}