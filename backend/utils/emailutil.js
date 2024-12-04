const nodemailer = require('nodemailer');

async function sendEmailNotification(email) {
    // Configuration de Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'ssl0.ovh.net',  // Utilisez le serveur SMTP de Mailgun
      port: 465,                 // Port SMTP (587 pour TLS)
      secure: true,             // Utilisez false pour TLS
      auth: {
        user: 'hela.zouch@optimaje.com', // Remplacez par votre utilisateur Mailgun
        pass: '98656920h',     // Remplacez par votre mot de passe Mailgun ou votre clé API
      },
    });

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'helazouch9@gmail.com', // Remplacez par votre email
    //         pass: 'fplb dihz kcke nqdw',   // Mot de passe ou mot de passe d'application
    //     },
    // });

    const mailOptions = {
        from: 'hela.zouch@etudiant-fst.utm.tn', // Votre adresse e-mail
        to: email,                      // Destinataire
        subject: 'Notification',
        text: `Bonjour,

Nous espérons que vous profitez pleinement de votre abonnement à notre salle de sport. Nous souhaitons vous informer que votre offre actuelle reste valable encore 7 jours.

Pour garantir la continuité de vos entraînements sans interruption, nous vous invitons à renouveler votre abonnement dès maintenant. Cela vous permettra de continuer à bénéficier de nos installations et de nos services de qualité.

Pour tout renseignement complémentaire ou pour effectuer le renouvellement, n’hésitez pas à nous contacter ou à vous rendre directement à l’accueil de la salle.

Nous restons à votre disposition pour toute question.

Cordialement,  
L'équipe de Salty.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
        throw error; // Propager l'erreur pour une gestion ultérieure
    }
}

module.exports = sendEmailNotification;
