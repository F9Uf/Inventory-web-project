module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  DB_host: process.env.DB_host || 'localhost',
  DB_user : process.env.DB_user || '',
  DB_password : process.env.DB_password || '',
  DB_database : process.env.DB_database || 'inventory'
}
