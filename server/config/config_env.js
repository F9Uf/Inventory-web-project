module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  DB_host: process.env.DB_host || 'us-cdbr-iron-east-03.cleardb.net',
  DB_user : process.env.DB_user || 'b241da87ca3d3b',
  DB_password : process.env.DB_password || '3c118caa',
  DB_database : process.env.DB_database || 'heroku_784b4884b79ec0d'
}
