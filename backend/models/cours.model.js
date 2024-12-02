const { DataTypes } = require('sequelize');
const db = require('../db'); // Importez votre instance Sequelize

const Cours = db.define('Cours', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  day: {
    type: DataTypes.STRING,
    allowNull: false, // Par exemple : "Lundi", "Mardi", etc.
  },
  validity: {
    type: DataTypes.BOOLEAN, // Pour stocker une date de validité
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME, // Pour stocker l'heure (HH:mm:ss)
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER, // Nombre maximal d'étudiants ou participants
    allowNull: false,
  },
}, {
    tableName: 'cours', // Nom de la table dans la base de données
    timestamps: false, // Désactiver les colonnes createdAt et updatedAt
  });

module.exports = Cours;
