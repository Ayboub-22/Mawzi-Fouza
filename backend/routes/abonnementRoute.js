const express = require('express');
const Abonnement = require('../models/abonnement.model'); // Modèle Abonnement
const User = require('../models/user.model'); // Modèle User
const Offre = require('../models/offre.model'); // Modèle Offre
const { Op } = require('sequelize'); // Opérateurs Sequelize pour les requêtes complexes
const router = express.Router();

// Récupérer tous les abonnements (GET)
router.get('/', async (req, res) => {
  try {
    const abonnements = await Abonnement.findAll({
      include: [
        { model: User, attributes: ['cin', 'name', 'mail', 'tel', 'birth', 'sex'] }, // Inclure les détails de l'utilisateur
        { model: Offre, attributes: ['id_offre', 'durée', 'prix', 'validité'] }, // Inclure les détails de l'offre
      ],
    });
    res.status(200).json(abonnements);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des abonnements.', error: error.message });
  }
});

// Récupérer un abonnement spécifique par ID (GET)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const abonnement = await Abonnement.findByPk(id, {
      include: [
        { model: User, attributes: ['cin', 'name', 'mail', 'tel', 'birth', 'sex'] },
        { model: Offre, attributes: ['id_offre', 'durée', 'prix', 'validité'] },
      ],
    });
    if (abonnement) {
      res.status(200).json(abonnement);
    } else {
      res.status(404).json({ message: 'Abonnement non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'abonnement.', error: error.message });
  }
});

// Créer un nouvel abonnement (POST)
router.post('/addAbonnement', async (req, res) => {
  const { date_debut, userId, offreId } = req.body;

  try {
    // Étape 1 : Rechercher l'abonnement le plus récent pour ce userId
    const dernierAbonnement = await Abonnement.findOne({
      where: { userId },
      order: [['id_abonnement', 'DESC']], // Trier par ID décroissant pour obtenir le dernier
      include: [{
        model: Offre,
        attributes: ['durée'] // Inclure la durée de l'offre pour le calcul
      }]
    });

    // Étape 2 : Vérifier si un abonnement existe et s'il est encore valide
    if (dernierAbonnement) {
      const { durée } = dernierAbonnement.Offre; // Durée de l'offre
      const dateFin = new Date(dernierAbonnement.date_debut);
      dateFin.setMonth(dateFin.getMonth() + durée); // Calcul de la date de fin

      // Vérifier si la date de fin est supérieure ou égale à aujourd'hui
      if (dateFin >= new Date()) {
        return res.status(400).json({
          message: `vous possèdez déjà un abonnement valide jusqu'au ${dateFin.toISOString().split('T')[0]}.`
        });
      }
    }

    // Étape 3 : Créer un nouvel abonnement
    const nouvelAbonnement = await Abonnement.create({ date_debut, userId, offreId });
    res.status(201).json(nouvelAbonnement);

  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la création de l\'abonnement.',
      error: error.message
    });
  }
});


// Mettre à jour un abonnement existant (PUT)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { date_debut, userId, offreId } = req.body;
  try {
    const abonnement = await Abonnement.findByPk(id);
    if (abonnement) {
      await abonnement.update({ date_debut, userId, offreId });
      res.status(200).json(abonnement);
    } else {
      res.status(404).json({ message: 'Abonnement non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'abonnement.', error: error.message });
  }
});

// Supprimer un abonnement (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const abonnement = await Abonnement.findByPk(id);
    if (abonnement) {
      await abonnement.destroy();
      res.status(200).json({ message: 'Abonnement supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Abonnement non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'abonnement.', error: error.message });
  }
});

// Récupérer les abonnements actifs pour un utilisateur spécifique (GET)
router.get('/user/:userId/active', async (req, res) => {
  const { userId } = req.params;
  const today = new Date();

  try {
    const abonnementActif = await Abonnement.findOne({
      where: { userId },
      include: [
        {
          model: Offre,
          attributes: ['durée'],
          required: true,
        },
      ],
      order: [['id_abonnement', 'DESC']], // Trouver l'abonnement avec le plus grand ID
    });

    if (abonnementActif) {
      // Calculer la date de fin
      const dateFin = new Date(abonnementActif.date_debut);
      dateFin.setDate(dateFin.getDate() + abonnementActif.Offre.durée);

      if (dateFin >= today) {
        res.status(200).json({
          userId,
          id_abonnement: abonnementActif.id_abonnement,
          actif: true,
        });
      } else {
        res.status(200).json({ userId, id_abonnement: 0, actif: false });
      }
    } else {
      res.status(404).json({ userId, id_abonnement: 0, actif: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la vérification de l\'abonnement actif.', error: error.message });
  }
});

module.exports = router;
