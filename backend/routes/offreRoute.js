const express = require('express');
const Offre = require('../models/offre.model'); // Import the Offre model

const router = express.Router();

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


  module.exports=router;