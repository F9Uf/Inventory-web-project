const db = require('../../db');

module.exports = (req, res) => {
  const id = req.params.car_id;
  const newUpdate = req.body

  const sql_Update = 'UPDATE car SET'
  let sql_value = ' '
  let arr_value = []
  const sql_WHERE = 'WHERE carID = ?'

  for (key in newUpdate) {
    sql_value += `${key} = ?, `
    arr_value.push(newUpdate[key])
  }
  sql_value = sql_value.slice(0, -2)
  arr_value.push(id)

  db.query(sql_Update + sql_value + sql_WHERE, arr_value, (err, data) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Update car is error!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Update car is successful!'
      })
    }
  })
}