const express = require('express');
const User = require('../models/user.model'); // Importer le modèle User
const router = express.Router();
const { Op } = require('sequelize');

// Login route
router.post('/login', async (req, res) => {
  const { mail, password } = req.body;

  try {
    console.log("Received login data:", req.body); // Log the received data

    const user = await User.findOne({
      where: { mail },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (user.mdp !== password) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    console.log(user.cin);
    
    // Return only the user ID for better security
    res.status(200).json({
      message: "Login successful",
      user: { cin: user.cin }, // Only send back the user ID            //changement ici
    });
  } catch (error) {
    console.error("Server error:", error); // Log the error in more detail
    res.status(500).json({
      message: "Server error",
      error: error.message || error,
    });
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  const { cin, name, mail, tel, birth, sex, mdp } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ cin }, { mail }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this CIN or email already exists',
      });
    }

    // Create user
    const newUser = await User.create({
      cin,
      name,
      mail,
      tel,
      birth,
      sex,
      mdp, // Store plain text password directly
    });

    res.status(201).json({
      message: 'User created successfully',
      user: { id: newUser.id }, // Only send back the new user ID
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create user',
      error: error.message || error,
    });
  }
});

// Route pour récupérer tous les utilisateurs (GET)
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll(); // Récupérer tous les utilisateurs
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des utilisateurs.',
      error: error.message,
    });
  }
});

// Route pour récupérer un utilisateur par CIN (GET)
router.get('/:cin', async (req, res) => {
  const { cin } = req.params;
  try {
    const user = await User.findByPk(cin); // Trouver un utilisateur par clé primaire (CIN)
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération de l\'utilisateur.',
      error: error.message,
    });
  }
});

// Route pour créer un nouvel utilisateur (POST)
router.post('/addUser', async (req, res) => {
  const { cin, name, mail, tel, birth, sex, mdp } = req.body;
  try {
    const newUser = await User.create({
      cin,
      name,
      mail,
      tel,
      birth,
      sex,
      mdp,
    }); // Créer un nouvel utilisateur
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la création de l\'utilisateur.',
      error: error.message,
    });
  }
});

// Route pour mettre à jour un utilisateur existant (PUT)
router.put('/:cin', async (req, res) => {
  const { cin } = req.params;
  const { name, mail, tel, birth, sex, mdp } = req.body;
  try {
    const user = await User.findByPk(cin); // Trouver l'utilisateur par CIN
    if (user) {
      await user.update({ name, mail, tel, birth, sex, mdp }); // Mettre à jour l'utilisateur
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de l\'utilisateur.',
      error: error.message,
    });
  }
});

// Route pour supprimer un utilisateur (DELETE)
router.delete('/:cin', async (req, res) => {
  const { cin } = req.params;
  try {
    const user = await User.findByPk(cin); // Trouver l'utilisateur par CIN
    if (user) {
      await user.destroy(); // Supprimer l'utilisateur
      res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la suppression de l\'utilisateur.',
      error: error.message,
    });
  }
});

module.exports = router; // Ensure the router is exported
