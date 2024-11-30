const { Sequelize } = require('sequelize');
require ('dotenv').config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,  // Host
    dialect: process.env.DB_DIALECT, // Dialect (e.g., 'mysql', 'postgres')
    logging: false              // Disable logging (optional)
  }
);

module.exports = db;
