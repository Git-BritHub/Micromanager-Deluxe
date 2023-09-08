const mysql = require('mysql2');

// enable access to .env variables
require('dotenv').config();

// use environment/.env variables to connect to database
const sequelize = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}
);

module.exports = sequelize;