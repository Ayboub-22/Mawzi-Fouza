const { DataTypes } = require('sequelize');
const db = require('../db'); // Import the Sequelize instance
const Abonnement=require('./abonnement.model');
const Cours=require('./cours.model');

const Reservation = db.define('Reservation', {
    id_reservation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_abonnement: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Date actuelle par défaut
    },
    date_cours: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    
  }, {
    tableName: 'reservation', // Nom de la table dans la base de données
    timestamps: false, // Si vous n'utilisez pas createdAt et updatedAt
});

// Définir les relations
Abonnement.hasMany(Reservation, { foreignKey: 'id_abonnement' });
Reservation.belongsTo(Abonnement, { foreignKey: 'id_abonnement' });

Cours.hasMany(Reservation, { foreignKey: 'id' });
Reservation.belongsTo(Cours, { foreignKey: 'id' });



module.exports = Reservation;