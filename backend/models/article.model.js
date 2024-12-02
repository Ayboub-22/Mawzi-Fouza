const { DataTypes } = require('sequelize');
const db = require('../db'); // Chemin vers votre configuration Sequelize

const Article = db.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Champ obligatoire
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false, // Champ optionnel
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false, // Champ obligatoire
  },
  categorie: {
    type: DataTypes.STRING,
    allowNull: false, // Champ obligatoire
  },
  img_path: {
    type: DataTypes.STRING,
    allowNull: false, // Champ optionnel
  },
}, {
  tableName: 'article', // Nom de la table dans la base de données
  timestamps: false, // Désactiver les colonnes createdAt et updatedAt
});

module.exports = Article;
