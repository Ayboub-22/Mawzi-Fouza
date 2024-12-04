const express = require('express');
const { Op } = require('sequelize');
const User = require('../models/user.model');
const Abonnement = require('../models/abonnement.model');
const Offre = require('../models/offre.model');
const router = express.Router();

router.get('/isAdherent/:cin', async (req, res) => {
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
});

module.exports = router;
