/**
   * "insert into order values 
   * ('?', '?'), 
   * ('?', '?'), 
   * ('?', '?'), "
   * 
   * data = [
   *  {firstName: 'sdflkjlk', lastName: 'alkjflkj'},
   *  {firstName: 'lkjlkjlk', lastName: 'lkjlkjlkk}
   * ]
   * let sql_value =[]
   * 
   * for (let i = 0; i<data.length; i++) {
   *  sql_update += '(?, ?),'
   *  sql_value.push(data[i].firstName )
   *  sql_value.push(data[i].lastName)
   * }
   * sql_update = sql_update.splice(0, -1)
   * 
   * db.query(sql_update, sql_value, (err, data) => {
   * 
   * })
   * 
   */