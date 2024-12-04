const express = require('express');
const { Op } = require('sequelize'); // Import pour les opérateurs avancés
const User = require('../models/user.model'); // Modèle User
const Abonnement = require('../models/abonnement.model'); // Modèle Abonnement
const Offre = require('../models/offre.model'); // Modèle Offre
const Notif = require('../models/notif.model');
const router = express.Router();
const sendEmailNotification = require('../utils/emailutil'); // Importer la fonction utilitaire

// Récupérer la table construite (GET) pour la page members
router.get('/', async (req, res) => {
  try {
    // Obtenir la date actuelle pour les calculs
    const today = new Date();

    // Requête principale
    const result = await User.findAll({
      attributes: ['cin', 'name', 'mail', 'tel', 'birth', 'sex', 'mdp'], // Colonnes du modèle User
      include: [
        {
          model: Abonnement,
          attributes: ['id_abonnement', 'date_debut', 'offreId'], // Colonnes nécessaires
          include: [
            {
              model: Offre,
              attributes: ['durée'], // Inclure la durée pour calculer la validité
            },
          ],
          required: false, // LEFT OUTER JOIN : inclure les utilisateurs sans abonnement
        },
      ],
    });

    // Transformer les résultats pour créer la table
    const table = result.map(user => {
      // Trouver l'abonnement avec l'id_abonnement le plus grand pour cet utilisateur
      const abonnements = user.Abonnements || [];
      const latestAbonnement = abonnements.reduce((latest, current) => {
        return !latest || current.id_abonnement > latest.id_abonnement ? current : latest;
      }, null);

      // Vérifier si l'abonnement est valide
      let id_abonnement = 0;
      let subscriptionStatus = 'expired'; // Par défaut, on considère que l'abonnement est expiré
      if (latestAbonnement) {
        const offre = latestAbonnement.Offre; // Récupérer l'offre liée
        if (offre) {
          const date_debut = new Date(latestAbonnement.date_debut);
          const date_fin = new Date(date_debut);
          date_fin.setMonth(date_fin.getMonth() + offre.durée); // Ajouter la durée en mois

          // Si l'abonnement est valide, inclure son id_abonnement, sinon mettre 0
          if (date_fin >= today) {
            id_abonnement = latestAbonnement.id_abonnement;
            subscriptionStatus = 'active'; // L'abonnement est actif
          }
        }
      }

      // Retourner uniquement les colonnes nécessaires
      return {
        cin: user.cin,
        name: user.name,
        mail: user.mail,
        tel: user.tel,
        birth: user.birth,
        sex: user.sex,
        id_abonnement, // Ajouter la colonne id_abonnement calculée
        subscriptionStatus, // Ajouter l'état de l'abonnement (actif ou expiré)
      };
    });

    // Retourner la table construite
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la construction de la table.',
      error: error.message,
    });
  }
});

// pour la page subs :table
router.get('/subs', async (req, res) => {
  try {
    // Étape 1: Récupérer tous les utilisateurs avec leurs abonnements et offres
    const subscriptions = await User.findAll({
      include: [
        {
          model: Abonnement,
          attributes: ['id_abonnement', 'date_debut', 'offreId'],
          include: [
            {
              model: Offre,
              attributes: ['id_offre', 'durée'], // Inclure la durée en mois pour calculer `end_date`
            },
          ],
        },
      ],
    });

    // Étape 2: Filtrer les abonnements pour obtenir ceux qui répondent aux critères
    const results = subscriptions.flatMap((user) => {
      const userAbonnements = user.Abonnements;

      if (!userAbonnements || userAbonnements.length === 0) {
        return []; // Aucun abonnement pour cet utilisateur
      }

      // Trouver l'abonnement avec le `id_abonnement` le plus grand
      const latestAbonnement = userAbonnements.reduce((latest, current) =>
        current.id_abonnement > latest.id_abonnement ? current : latest
      );

      // Calculer la date de fin de l'abonnement
      const startDate = new Date(latestAbonnement.date_debut);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + latestAbonnement.Offre.durée); // Ajouter la durée en mois

      // Vérifier si la date de fin correspond exactement à "aujourd'hui + 7 jours"
      const todayPlusSeven = new Date();
      todayPlusSeven.setDate(todayPlusSeven.getDate() + 7);

      // Comparaison des dates (ignorer les heures/minutes/secondes)
      const isExactMatch =
        endDate.toISOString().split('T')[0] === todayPlusSeven.toISOString().split('T')[0];

      if (isExactMatch) {
        // Retourner les informations nécessaires
        return {
          cin: user.cin,
          name: user.name,
          mail: user.mail,
          id_offre: latestAbonnement.Offre.id_offre,
          start_date: startDate.toISOString().split('T')[0], // Formater en AAAA-MM-JJ
          end_date: endDate.toISOString().split('T')[0], // Formater en AAAA-MM-JJ
          id_abonnement: latestAbonnement.id_abonnement, // Assurez-vous que ceci est inclus
          subscriptionStatus: endDate >= new Date() ? 'active' : 'expired', // Ajouter l'état de l'abonnement
        };
      }

      return []; // Abonnement non éligible
    });
    
    console.log("avant etape 3");

    // Étape 3: Insérer les id_abonnement dans la table Notif si non existants
    await Promise.all(
      results.map(async (sub) => {
        if (sub.id_abonnement) {
          const exists = await Notif.findOne({ where: { id_abonnement: sub.id_abonnement } });
          if (!exists) {
            await Notif.create({ id_abonnement: sub.id_abonnement, notified: false });
          }
        } else {
          console.error(`id_abonnement is undefined for subscription:`, sub);
        }
      })
    );
    

    // Étape 4: Filtrer les résultats avec Notif.notified === false
    const filteredResults = await Notif.findAll({
      where: { notified: false },
      include: [
        {
          model: Abonnement,
          include: [
            { model: User, attributes: ['cin', 'name', 'mail'] },
            { model: Offre, attributes: ['id_offre', 'durée'] },
          ],
        },
      ],
    });
    
    const finalResults = filteredResults.map((notif) => {
      const { Abonnement: sub } = notif;
      if (sub && sub.User && sub.Offre && sub.id_abonnement) {
        const { cin, name, mail } = sub.User;
        const { id_offre, durée } = sub.Offre;
    
        const startDate = new Date(sub.date_debut);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + durée);
    
        return {
          cin,
          name,
          mail,
          id_offre,
          start_date: startDate,
          end_date: endDate,
          subscriptionStatus: endDate >= new Date() ? 'active' : 'expired', // Ajouter l'état de l'abonnement
        };
      } else {
        console.error('Subscription or related data is missing:', notif);
        return null; // On retourne null si les données sont incorrectes
      }
    }).filter(result => result !== null); // Filtrer les résultats invalides

    res.status(200).json(finalResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing subscriptions.' });
  }
});

// Route pour le bouton "Send Notification"
router.post('/subs/notify', async (req, res) => {
  console.log("j'ai intercepte rqt");
  try {
    // Étape 1 : Récupérer les emails avec une jointure
    const result = await Notif.findAll({
      where: { notified: false }, // Filtrer les notifications non envoyées
      include: [
        {
          model: Abonnement,
          required: true, // Jointure avec Abonnement
          include: [
            {
              model: User,
              required: true, // Jointure avec User
              attributes: ['mail'], // Ne récupérer que l'email
            },
          ],
        },
      ],
    });
    console.log("fin etape 1");

    // Étape 2 : Extraire les emails uniques
    const emails = result.map((notif) => notif.Abonnement.User.mail);
    console.log(emails);
    if (emails.length > 0) {
      // Étape 3 : Envoyer les notifications
      await sendEmailNotification(emails);
      console.log('Notifications envoyées');
      
      // Mettre à jour la colonne "notified" à true
      await Notif.update({ notified: true }, { where: { notified: false } });
      res.status(200).send('Notifications sent successfully.');
    } else {
      res.status(200).send('No notifications to send.');
    }
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).send('An error occurred while sending notifications.');
  }
});
router.get('/reservation', async (req, res) => {
  try {
    const { cin } = req.query; // Récupérez le CIN de l'utilisateur depuis les paramètres de la requête

    if (!cin) {
      return res.status(400).json({ message: 'CIN est requis.' });
    }

    // Trouver l'utilisateur en fonction du CIN
    const user = await User.findOne({
      where: { cin },
      include: [
        {
          model: Abonnement,
          attributes: ['id_abonnement', 'date_debut', 'offreId'],
          include: [
            {
              model: Offre,
              attributes: ['durée'],
            },
          ],
          required: false,
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérifiez si l'utilisateur a un abonnement actif
    const abonnements = user.Abonnements || [];
    const latestAbonnement = abonnements.reduce((latest, current) => {
      return !latest || current.id_abonnement > latest.id_abonnement ? current : latest;
    }, null);

    let adherent = false;
    if (latestAbonnement) {
      const offre = latestAbonnement.Offre;
      const date_debut = new Date(latestAbonnement.date_debut);
      const date_fin = new Date(date_debut);
      date_fin.setMonth(date_fin.getMonth() + offre.durée);

      if (date_fin >= new Date()) {
        adherent = true;
      }
    }

    // Retourner l'état d'adhésion
    res.status(200).json({ adherent });
  } catch (error) {
    console.error("Erreur lors de la vérification du statut d'adhésion :", error);
    res.status(500).json({ message: 'Erreur lors de la vérification du statut d\'adhésion.' });
  }
});


module.exports = router;
