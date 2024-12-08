const express = require('express');
const { Op } = require('sequelize');
const Abonnement = require('../models/abonnement.model');
const Cours=require('../models/cours.model');
const Reservation=require('../models/reservation.model');
const User=require('../models/user.model');
const router = express.Router();


const getDayIndex = (day) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
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

     // Si il reste des places, chercher l'id_abonnement du user connu par userCin1
    const user = await User.findOne({
      where: { cin: userCin1 },
      include: {
        model: Abonnement, // Jointure avec la table Abonnement
        required: true, // Cette option garantit que l'utilisateur possède un abonnement
        order: [['id_abonnement', 'DESC']], // Trier par id_abonnement décroissant pour obtenir le plus grand
        limit: 1, // Limiter à 1 résultat (le plus grand)
      },
    });

    // Récupérer le id_abonnement le plus grand
    const id_abonnement = user.Abonnements[0].id_abonnement;
    console.log('id_abonnement trouvé :', id_abonnement);


    const formattedDate1 = new Date(`${formattedDate}T00:00:00Z`); // Date complète avec heure à 00:00:00
    console.log('formattedDate1:', formattedDate1);

    // Vérifier si une réservation existe déjà pour cet abonnement, cours et date
    const existingReservation = await Reservation.findOne({
      where: {
        id_abonnement: id_abonnement,
        id: courseId,
        date_cours: formattedDate1,
      },
    });
    console.log(existingReservation);
    if (existingReservation) {
      console.log("d5alt lil 403");
      return res.status(403).json({
        error: 'Vous avez déjà réservé ce cours. Merci de l\'attendre.',
      });
    }


    // Ajouter une ligne dans la table Reservation avec le id_abonnement

    const reservation = await Reservation.create({
      id:courseId,
      date:new Date(),
      date_cours: formattedDate,
      time: time,
      id_abonnement: id_abonnement,
    });

    // Répondre avec un message de succès
    return res.status(200).json({ message: 'Réservation réussie', reservation });
  
  } catch (error) {
    console.error('Erreur lors de la récupération du cours :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
})



router.get('/rate', async (req, res) => {
  try {
    // Exécution de la requête pour récupérer les réservations avec la jointure sur la table Cours
    const courses = await Cours.findAll({
      attributes:['id', 'name', 'day' , 'validity', 'time', 'capacity'],
      include: [
        {
          model: Reservation, // Jointure avec la table Cours
          attributes:['id_reservation','id_abonnement','id','date','date_cours','time'], // Récupérer les colonnes 'id' et 'name' de la table Cours
          required: false,
        },
      ],
    });
    // Transformation : Regrouper par 'name' unique et compter les réservations
    const groupedResults = courses.reduce((acc, course) => {
      const courseName = course.name;
      const reservationCount = course.Reservations.length;

      if (!acc[courseName]) {
        acc[courseName] = { courseName, reservationCount: 0 };
      }
      acc[courseName].reservationCount += reservationCount;

      return acc;
    }, {});

    const groupedResultsArray = Object.values(groupedResults); //convertir l'objet en Array 

    // Tri par ordre décroissant selon reservationCount
    const sortedResults = groupedResultsArray.sort((a, b) => b.reservationCount - a.reservationCount);

    // Limitation aux 5 premières lignes
    const finalResults = sortedResults.slice(0, 5);

    // Retourner les résultats
    res.status(200).json(finalResults);

  } catch (error) {
    console.log("erreur dans back ");
    // Gestion des erreurs en cas de problème
    console.error('Erreur lors de la récupération des réservations et des cours :', error);
  }
  
});


module.exports = router;
