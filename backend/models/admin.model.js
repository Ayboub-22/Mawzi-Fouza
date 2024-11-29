const { DataTypes } = require('sequelize');
const db = require('../db'); // Import the Sequelize instance

const Admin = db.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'admin', // Optional: specify table name explicitly
  timestamps: false,  // Disable `createdAt` and `updatedAt` columns to unable them make it true
});

module.exports = Admin;
