const db = require('../../db');
const queryToStringCondition = require('../../services/queryToStringCondition');

module.exports = (req, res) => {
  let sql = `SELECT DISTINCT  o.orderID,o.createAt,o.orderType,o.shopID,s.shopName
  FROM ordermain o LEFT JOIN shop s 
  ON o.shopID = s.shopID`;
  const condition = queryToStringCondition(req.query);
  console.log(condition);
  let value_array = [];
  if (condition) {
    sql += condition.sql;
    value_array = condition.value_array;
  }
  db.query(sql, value_array, (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: err
      })
    } else {
      if (data) {
        return res.json({
          success: true,
          message: 'Successfully!',
          result: data
        })
      } else {
        // if not found
        return res.json({
          success: false,
          message: 'Fail!'
        })
      }
    }
  })
}