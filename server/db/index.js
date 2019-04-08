const mysql = require('mysql');
const config_env = require('../config/config_env');

const connection = mysql.createPool({
    host: config_env.DB_host,
    user: config_env.DB_user,
    password: config_env.DB_password,
    database: config_env.DB_database
});

connection.getConnection( err => {
    if (err) console.log(err);
    console.log('Database is connected...');    
});

module.exports = connection;