const db = require('../../db');

module.exports = (req, res) => {
  const sql = `select A.stockName ,max(A.areaOfStock) as maxAreaOfStock from (select s.stockName, sum(l.maxArea) as areaOfStock 
  from stock s, location l
  where l.stockID = s.stockID
  group by l.stockID) as A`;

  db.query(sql, (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: err
      })
    } else {
      if (data) {
        return res.json({
          success: true,
          message: 'Successfully queried!',
          result: data
        })
      } else {
        // if not found
        return res.json({
          success: false,
          message: 'Don\'t query'
        })
      }
    }
  })
}
