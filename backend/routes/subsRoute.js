const express = require('express');
const router = express.Router();
const { sendEmailNotification } = require('../utils/emailutil');  // Importation de la fonction d'envoi d'email

router.post('/send-subscription-notification', (req, res) => {
  const { email, subject, message } = req.body;

  // Appel de la fonction pour envoyer l'email
  sendEmailNotification(email, subject, message);

  res.status(200).send('Notification envoyée avec succès.');
});

module.exports = router;
