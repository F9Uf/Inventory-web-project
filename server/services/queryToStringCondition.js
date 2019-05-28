
module.exports = (query) => {
  let sql = ''
  let sql_value = []
  if (Object.keys(query).length) {
    // have query
    sql += ' WHERE '
    for (key in query) {
      sql += `${key} = ? AND `
      sql_value.push(query[key])
    }
    sql = sql.slice(0, -4)
    return {
      sql: sql,
      value_array: sql_value
    }
  } else {
    return null
  }
}
