const { DataTypes } = require('sequelize');
const db = require('../db'); // Import the Sequelize instance

const User = db.define('User', {
  cin: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  tel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sex: {
    type: DataTypes.ENUM('M', 'F'), // Exemple : 'M' pour masculin, 'F' pour féminin
    allowNull: false,
  },
  mdp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'user', // Nom de la table dans la base de données
  timestamps: false, // Désactiver les colonnes createdAt et updatedAt
});

module.exports = User;
