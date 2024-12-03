const { DataTypes } = require('sequelize');
const db = require('../db'); // Import the Sequelize instance
const User = require('./user.model'); // Importez le modèle User
const Offre = require('./offre.model'); // Importez le modèle Offre
const Notif=require('./notif.model');

const Abonnement = db.define('Abonnement', {
  id_abonnement: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'abonnement', // Nom de la table dans la base de données
  timestamps: false,
});

// Relation avec le modèle User
Abonnement.belongsTo(User, { foreignKey: 'userId' }); // 'userId' comme clé étrangère dans la table abonnement 
User.hasMany(Abonnement, { foreignKey: 'userId' });   // Un utilisateur peut avoir plusieurs abonnements

// Relation avec le modèle Offre
Abonnement.belongsTo(Offre, { foreignKey: 'offreId' }); // 'offreId' comme clé étrangère dans la table abonnement 
Offre.hasMany(Abonnement, { foreignKey: 'offreId' });   // Une offre peut être liée à plusieurs abonnements

Abonnement.hasOne(Notif, { foreignKey: 'id_abonnement' });
Notif.belongsTo(Abonnement, { foreignKey: 'id_abonnement' });

module.exports = Abonnement;
