const db = require('../../db');

module.exports = (req, res) => {
  const id = req.params.order_id;
  const newUpdate = req.body

  const sql_Update = 'UPDATE ordermain SET'
  let sql_value = ' '
  let arr_value = []
  const sql_WHERE = ' WHERE orderID = ?'

  for (key in newUpdate) {
    sql_value += `${key} = ?, `
    arr_value.push(newUpdate[key])
  }
  sql_value = sql_value.slice(0, -2)
  arr_value.push(id)

  db.query(sql_Update + sql_value + sql_WHERE, arr_value, (err, data) => {
    if (err) {
      console.log(err);

      return res.json({
        success: false,
        message: 'Update order is error!'
      })
    } else {
      return res.json({
        success: true,
        message: 'Update order is successful!'
      })
    }
  })
}