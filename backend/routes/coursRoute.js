const express = require('express');
const router = express.Router();
const Cours = require('../models/cours.model'); // Importez le modèle Sequelize

// Créer un nouveau cours (POST)
router.post('/addCours', async (req, res) => {
  const { name, day, validity, time, capacity } = req.body;

  try {
    const existingCours = await Cours.findOne({
      where: {
        day,
        time,
        validity: true, // On ne vérifie que les cours valides
      },
    });

    // Si un cours valide existe déjà, renvoyer une erreur
    if (existingCours) {
      return res.status(400).json({
        message: 'Un cours valide existe déjà pour ce jour et cette heure.',
      });
    }

    const newCours = await Cours.create({
      name,
      day,
      validity,
      time,
      capacity
    });
    res.status(201).json(newCours);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la création du cours.',
      error: error.message
    });
  }
});
router.get('/planning',async(req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Cours.findAll({
      where: {
        validity: true, // Condition pour sélectionner uniquement les cours valides
      },
    });
    // Respond with the courses
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des cours.',
      error: error.message
    });
  }
});

router.get('/getter', async (req, res) => {
  try {
    // Fetch all courses from the database
    const cours = await Cours.findAll({
      where: {
        validity: true, // Condition pour sélectionner uniquement les cours valides
      },
    });
    // Initialize an empty schedule
    const schedule = {
      Monday: Array(8).fill(""),
      Tuesday: Array(8).fill(""),
      Wednesday: Array(8).fill(""),
      Thursday: Array(8).fill(""),
      Friday: Array(8).fill(""),
      Saturday: Array(8).fill(""),
      Sunday: Array(8).fill(""),
    };

    // Loop through the results and assign them to the correct days and periods
    cours.forEach((cours) => {
      const {
        day,
        time,
        name,
        validity
      } = cours;
      // Assuming your model has these fields
      if (validity) {
        schedule[day][time] = name;
      } // Adjusting to zero-based index

    });

    // Respond with the schedule
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des cours.',
      error: error.message
    });
  }
});


// Récupérer tous les cours (GET)
router.get('/', async (req, res) => {
  try {
    const cours = await Cours.findAll();
    res.status(200).json(cours);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des cours.',
      error: error.message
    });
  }
});

// Récupérer un cours par ID (GET)
router.get('/:id', async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const cours = await Cours.findByPk(id);
    if (cours) {
      res.status(200).json(cours);
    } else {
      res.status(404).json({
        message: 'Cours non trouvé.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération du cours.',
      error: error.message
    });
  }
});


//pour le check box de classes
router.put('/:id/validity', async (req, res) => {
  const { id } = req.params; // ID du cours à modifier
  const { validity } = req.body; // Nouvelle valeur de validity
  console.log(id);
  console.log(validity );
  try {
    console.log("requete in")
    // Récupérer le cours à mettre à jour
    const courseToUpdate = await Cours.findByPk(id);

    if (!courseToUpdate) {
      return res.status(404).json({ message: 'Cours introuvable.' });
    }

    // Si la nouvelle validité est FALSE, vérifier les conflits
    if (validity) {
      const conflict = await Cours.findOne({
        where: {
          day: courseToUpdate.day,
          time: courseToUpdate.time,
          validity: true,
        },
      });

      // Si un conflit existe, empêcher la mise à jour
      if (conflict) {
        return res.status(400).json({
          message:
            'It is impossible to mark this course as valid. Another course is already valid for the same day and time.',
        });
      }
    }

    // Mettre à jour la validité dans la base de données
    courseToUpdate.validity = validity;
    await courseToUpdate.save();

    // Réponse de succès
    return res.status(200).json({
      message: `La validité du cours a été mise à jour avec succès.`,
      course: courseToUpdate,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la validité:', error);
    return res.status(500).json({
      message: 'Une erreur est survenue lors de la mise à jour.',
    });
  }
});
// Mettre à jour un cours (PUT)
router.put('/:id', async (req, res) => {
  const {
    id
  } = req.params;
  const {
    name,
    day,
    validity,
    time,
    capacity
  } = req.body;

  try {
    const cours = await Cours.findByPk(id);
    if (cours) {
      await cours.update({
        name,
        day,
        validity,
        time,
        capacity
      });
      res.status(200).json(cours);
    } else {
      res.status(404).json({
        message: 'Cours non é.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la mise à jour du cours.',
      error: error.message
    });
  }
});

// In your '/getCours' route



// Start the server


// Supprimer un cours (DELETE)
router.delete('/:id', async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const cours = await Cours.findByPk(id);
    if (cours) {
      await cours.destroy();
      res.status(200).json({
        message: 'Cours supprimé avec succès.'
      });
    } else {
      res.status(404).json({
        message: 'Cours non .'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la suppression du cours.',
      error: error.message
    });
  }
});

module.exports = router;