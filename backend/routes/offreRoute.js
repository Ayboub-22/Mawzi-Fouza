const express = require('express');
const Offre = require('../models/offre.model'); // Import the Offre model

const router = express.Router();

// CREATE: Add a new offer
router.post('/addOffer', async (req, res) => {
  const { durée, prix, validité } = req.body;
  try {
    const newOffer = await Offre.create({ durée, prix, validité});
    res.status(201).json({ message: 'Offer added successfully', offer: newOffer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add offer', error });
  }
});

// READ: Get all offers
router.get('/', async (req, res) => {
  try {
    const offers = await Offre.findAll();
    res.status(200).json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch offers', error });
  }
});

// READ: Get a single offer by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const offer = await Offre.findByPk(id);
    if (offer) {
      res.status(200).json(offer);
    } else {
      res.status(404).json({ message: 'Offer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch offer', error });
  }
});

// UPDATE: Update an offer
router.put('/:id', async (req, res) => {
  const { id } = req.params;                      //recuperer tout ce qui est apres / dans la variable id
  const { durée, prix, validité } = req.body;    //doivent etre les noms des colonnes

  try {
    const offer = await Offre.findByPk(id);    //offre represente ne ligne du model(table) Offre
    if (offer) {
      offer.durée = durée || offer.durée;
      offer.prix = prix || offer.prix;
      offer.validité = validité !== undefined ? validité : offer.validité;
      await offer.save();                     //l'update reellement 
      res.status(200).json({ message: 'Offer updated successfully', offer });
    } else {
      res.status(404).json({ message: 'Offer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update offer', error });
  }
});

// DELETE: Delete an offer
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const offer = await Offre.findByPk(id);
    if (offer) {
      await offer.destroy();
      res.status(200).json({ message: 'Offer deleted successfully' });
    } else {
      res.status(404).json({ message: 'Offer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete offer', error });
  }
});

module.exports = router;
