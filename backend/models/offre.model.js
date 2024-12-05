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
  description: {
    type: DataTypes.TEXT, // Correspond au type TEXT en MySQL
    allowNull: true,      // Correspond à NULL dans la base de données
  },
  type: {
    type: DataTypes.STRING(255), // Correspond au type VARCHAR(255) en MySQL
    allowNull: true,            // Autorise NULL comme dans votre commande ALTER
  },
}, {
  tableName: 'offre', // Optional: explicitly specify the table name
  timestamps: false,  // Disable automatic `createdAt` and `updatedAt` fields
});

module.exports = Offre;