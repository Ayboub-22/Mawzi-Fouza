const express = require('express');
const router = express.Router();
const Cours = require('../models/cours.model'); // Importez le modèle Sequelize

// Créer un nouveau cours (POST)
router.post('/addCours', async (req, res) => {
  const { name, day, validity, time, capacity } = req.body;

  try {
    const newCours = await Cours.create({ name, day, validity, time, capacity });
    res.status(201).json(newCours);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du cours.', error: error.message });
  }
});

// Récupérer tous les cours (GET)
router.get('/', async (req, res) => {
  try {
    const cours = await Cours.findAll();
    res.status(200).json(cours);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des cours.', error: error.message });
  }
});

// Récupérer un cours par ID (GET)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const cours = await Cours.findByPk(id);
    if (cours) {
      res.status(200).json(cours);
    } else {
      res.status(404).json({ message: 'Cours non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du cours.', error: error.message });
  }
});

// Mettre à jour un cours (PUT)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, day, validity, time, capacity } = req.body;

  try {
    const cours = await Cours.findByPk(id);
    if (cours) {
      await cours.update({ name, day, validity, time, capacity });
      res.status(200).json(cours);
    } else {
      res.status(404).json({ message: 'Cours non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du cours.', error: error.message });
  }
});

// Supprimer un cours (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const cours = await Cours.findByPk(id);
    if (cours) {
      await cours.destroy();
      res.status(200).json({ message: 'Cours supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Cours non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du cours.', error: error.message });
  }
});

module.exports = router;
