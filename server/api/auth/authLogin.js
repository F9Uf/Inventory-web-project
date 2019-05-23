const jwt = require('jsonwebtoken');
const db = require('../../db');
const config_key = require('../../config/config_key');

module.exports = (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const sql = 'SELECT employeeID, username, password, position, employeeFirstName, employeeLastName, employeePhotoUrl FROM employee WHERE username = ?';

    db.query(sql,
      [username],
      (err, data) => {
        if (err) {
          return res.json({
            success: false,
            message: err
          })
        } else {
          // if not err
          if (data[0] && data[0].password === password) {
            // if password correct
            // generate token
            const token = jwt.sign({
              _id: data[0].employeeID,
              username: data[0].username,
              role: data[0].position
            },
              config_key.jwtSecret,
              {
                expiresIn: '24h' // option expires in 24 hours
              })
              // response token
              return res.status(200).json({
                success: true,
                message: 'Authentication successful!xx',
                token: token
              })

          } else {
            // username password wrong
            return res.json({
              success: false,
              message: 'Username or Password is wrong!'
            })
          }
        }
    })
  } else {
    // .status(400)
    return res.json({
      success: false,
      message: 'Authentication failed! Please check the request'
    })
  }
}
