const db = require('../../db');

module.exports = (req, res) => {
  const sql = `select province , count(province) as countProvince
  from address a, employee e
  where e.addressID = a.addressID
  group by province`;

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