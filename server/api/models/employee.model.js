const db = require('../../db');
/**
 * Create new employee
 * @param {Object} data
 * @param {string} data.firstName
 * @param {string} data.lastName
 * @param {string} data.photoUrl
 * @param {string} data.adderss
 * @param {number} data.phone
 * @param {string} data.email
 * @param {string} data.position
 * @param {number} data.salary
 * @param {string} data.username
 * @param {string} data.password
 * @param {string} data.shopID
 */
exports.createNewEmployee = (data) => {
  const sql = 'INSERT INTO employee VALUES (?,?,?,?,?,?,?,?,?,?,?)'
  return new Promise((resolve, reject) => {
    db.query(sql,
      [data.id, data.firstName, data.lastName, data.adderss || null, data.phone || null, data.email || null, data.position, data.salary, data.username, data.password, data.shopID],
      (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })

  })
}

/**
 * find user by username
 * @param {Object} data
 * @param {string} data.username
 */
exports.findUserByUsername = (data) => {
  const sql1 = 'SELECT employeeID, username, password, position, employeeFirstName, employeeLastName, employeePhotoUrl FROM employee WHERE username = ?';
  return new Promise((resolve, reject) => {
    db.query(sql1, [data.username], (err, res) => {
      if (err) {
        reject(err)

      } else {
        resolve(res)
      }
    })
  })
}

/**
 * find user by employee id
 * @param {Object} data
 * @param {string} data.id
 */
exports.findUserById = (data) => {
  const sql = 'SELECT * FROM employee WHERE employeeID = ?'

  return new Promise((resolve, reject) => {
    db.query(sql, [data.id], (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })

  })
}

/**
 * update user by id
 * @param {Object} data
 * @param {string} data.id
 * @param {Object} data.field
 */
exports.updateEmployee = (data) => {
  const sql_Update = 'UPDATE employee SET'
  let sql_value = ' '
  let arr_value = []
  const sql_WHERE = 'WHERE employeeID = ?'

  for (key in data.field) {
    sql_value += `${key} = ?, `
    arr_value.push(data.field[key])
  }
  sql_value = sql_value.slice(0, -2)
  arr_value.push(data.id)

  return new Promise((resolve, reject) => {
    db.query(sql_Update + sql_value + sql_WHERE, arr_value, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })


}


//UPDATE employee SET employee.EmployeeFirstName = 'tose' WHERE employee.EmployeeID = 'EMP-000001'
