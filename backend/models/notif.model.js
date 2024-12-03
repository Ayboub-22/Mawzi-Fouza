// models/Notif.js
const { DataTypes } = require('sequelize');
const db = require('../db');

const Notif = db.define('Notif', {
    id_abonnement: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Identifiant unique pour cette table
    },
  notified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: false,
});

module.exports = Notif;
