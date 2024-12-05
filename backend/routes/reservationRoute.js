const express = require('express');
const { Op } = require('sequelize');
const Abonnement = require('../models/abonnement.model');
const Cours=require('../models/cours.model');
const Reservation=require('../models/reservation.model');
const router = express.Router();


const getDayIndex = (day) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days.indexOf(day);
};

router.post('/', async (req, res) => {
  const {userCin1,courseId} = req.body;
  try {

    //CHERCHER LA DATE DU COURS 

    // Récupérer le cours par son ID
    const course = await Cours.findByPk(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Cours non trouvé' });
    }

    const { day } = course;
    console.log(day);
    const {time}=course;
    console.log(time);
    const {capacity}=course;
    console.log(capacity);

    // Obtenir la date d'aujourd'hui
    const today = new Date();
    const todayIndex = today.getDay(); // Jour de la semaine en index (0 = dimanche)

    // Obtenir l'index du jour du cours
    const courseDayIndex = getDayIndex(day);

    // Calculer le nombre de jours jusqu'à la prochaine occurrence
    let diff = courseDayIndex - todayIndex;
    console.log(diff);
    if (diff < 0) {
      // Si le jour du cours est déjà passé cette semaine
      return res.status(400).json({ error: 'Cours déjà passé cette semaine' });
    }

    // Calculer la date exacte du cours
    const courseDate = new Date(today);
    courseDate.setDate(today.getDate() + diff);

    // Formater la date du cours
    const formattedDate = courseDate.toISOString().split('T')[0]; // Format : YYYY-MM-DD
    console.log(formattedDate);

  //CHERCHER S'IL Y A DES PLACES DANS CE COURS 
    console.log("commencer le truc de capacite");
    // Vérifier le nombre de réservations déjà effectuées pour ce cours, date et heure
    const reservationsCount = await Reservation.count({
      where: {
        id: courseId,
        date_cours: formattedDate,
        time: time,
      },
    });
    console.log(reservationsCount);

    // Vérifier si la capacité du cours est atteinte
    if (reservationsCount == capacity) {
      return res.status(401).json({ error: 'Le cours est complet, impossible de réserver.' });
    }


    //IL RESTE DES PLACES DONC 
    //CHERCHER LE id_abonnement DE CE USER CONNU PAR userCin1



    // Si la capacité n'est pas atteinte, on peut effectuer la réservation
    return res.status(200).json({ message: `Réservation possible pour le cours le ${formattedDate} à ${time}.` });

    
  
  
  
  
  
  
  
  } catch (error) {
    console.error('Erreur lors de la récupération du cours :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }

  



 




  //si il reste des places chercher le id_abonnement le plus grand de ce user connu
  //par son userCin1 et ajouter une ligne dans table reservation




})





/*router.get('/isAdherent/:cin', async (req, res) => {
  try {
    const { cin } = req.params;
    const today = new Date();

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
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ adherent: false, message: "Utilisateur non trouvé." });
    }

    // Vérifier le statut d'adhérent
    const latestAbonnement = user.Abonnements?.reduce((latest, current) => {
      return !latest || current.id_abonnement > latest.id_abonnement ? current : latest;
    }, null);

    let adherent = false;
    if (latestAbonnement) {
      const offre = latestAbonnement.Offre;
      if (offre) {
        const date_debut = new Date(latestAbonnement.date_debut);
        const date_fin = new Date(date_debut);
        date_fin.setMonth(date_fin.getMonth() + offre.durée);

        if (date_fin >= today) {
          adherent = true;
        }
      }
    }

    res.status(200).json({ adherent });
  } catch (error) {
    res.status(500).json({
      adherent: false,
      message: 'Erreur lors de la vérification du statut d’adhérent.',
      error: error.message,
    });
  }
});*/

module.exports = router;
