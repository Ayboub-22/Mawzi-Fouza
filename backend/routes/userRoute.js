const express = require('express');
const User = require('../models/user.model'); // Importer le modèle User
const router = express.Router();

// Route pour récupérer tous les utilisateurs (GET)
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll(); // Récupérer tous les utilisateurs
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.', error: error.message });
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
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur.', error: error.message });
  }
});

// Route pour créer un nouvel utilisateur (POST)
router.post('/addUser', async (req, res) => {
  const { cin, name, mail, tel, birth, sex, mdp } = req.body;
  try {
    const newUser = await User.create({ cin, name, mail, tel, birth, sex, mdp }); // Créer un nouvel utilisateur
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.', error: error.message });
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
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.', error: error.message });
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
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { mail, mdp } = req.body;

  try {
    const user = await User.findOne({ where: { mail } });
    if(user.mdp===mdp){
      res.status(200).json({ message: 'Welcome user', user });
    }
    else{
      res.status(401).json({message: 'Wrong password'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to connect', error });
  }
});

module.exports = router;
