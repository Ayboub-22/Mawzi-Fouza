const nodemailer = require('nodemailer');

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lindachrigui03@gmail.com', // Remplacez par votre adresse e-mail
    pass: '123456',   // Remplacez par votre mot de passe ou mot de passe d'application
  },
});

// Fonction pour envoyer une notification par e-mail
const sendEmailNotification = (toEmail, subject, text) => {
  const mailOptions = {
    from: 'lindachrigui03@gmail.com',  // L'email de l'expéditeur
    to: toEmail,                  // L'email du destinataire
    subject: subject,             // Sujet du mail
    text: text,                   // Contenu du mail
  };

  // Envoi de l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erreur d\'envoi d\'email:', error);
    } else {
      console.log('Email envoyé:', info.response);
    }
  });
};

module.exports = { sendEmailNotification };
