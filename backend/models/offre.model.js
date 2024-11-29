const { DataTypes } = require('sequelize');
const db = require('../db'); // Import the Sequelize instance

const Offre = db.define('Offre', {
  id_offre: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  durée: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  prix: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  validité: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'offre', // Optional: explicitly specify the table name
  timestamps: false,  // Disable automatic `createdAt` and `updatedAt` fields
});

module.exports = Offre;
