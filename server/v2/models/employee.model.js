const db = require('../../db');

exports.createNewEmployee = (data, done) => {
    const sql = 'INSERT INTO employee VALUES (?,?,?,?,?,?,?,?,?,?,?)'
    db.query(sql, 
        [data.id, data.firstName,data.lastName, data.adderss||null, data.phone||null, data.email||null, data.position, data.salary, data.username, data.password, data.shopID], 
        (err, res) => {
        if (err) {
            done(err, null);
        } else {
            done(null, res);
        }
    });
}

exports.findUserByUsername = (data, done) => {
    const sql1 = 'SELECT EmployeeID, Username, Password, Position FROM employee WHERE Username = ?';

    db.query(sql1, [data.username], (err, res) => {
        if (err) {
            done(err, null);
        } else {
            done(null, res);
        }
    });
}

exports.findUserById = (data, done) => {
    const sql = 'SELECT * FROM employee WHERE EmployeeID = ?'

    db.query(sql, [data.id], (err, res) => {
        if (err) {
            done(err, null);
        } else {
            done(null, res);
        }
    });
}