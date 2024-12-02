const express = require('express');
const Article = require('../models/article.model'); // Import the Admin model

const router = express.Router();

// Créer un nouvel article (POST)
router.post('/addArticle', async (req, res) => {
    try {
      const { name, designation, prix, categorie, img_path } = req.body;
      //console.log("reqt recue");
      const article = await Article.create({ name, designation, prix, categorie, img_path });
      res.status(201).json(article); // Retourne l'article créé
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création de l\'article.', error: error.message });
    }
  });
  
  // Récupérer tous les articles (GET)
  router.get('/', async (req, res) => {
    try {
      const articles = await Article.findAll();
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des articles.', error: error.message });
    }
  });
  
  // Récupérer un article par son ID (GET)
  router.get('/:id', async (req, res) => {
    try {
      const article = await Article.findByPk(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article non trouvé.' });
      }
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'article.', error: error.message });
    }
  });
  
  // Mettre à jour un article (PUT)
  router.put('/:id', async (req, res) =>{
    try {
      const { name, designation, prix, categorie, img_path } = req.body;
      const article = await Article.findByPk(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article non trouvé.' });
      }
      await article.update({ name, designation, prix, categorie, img_path });
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'article.', error: error.message });
    }
  });
  
  // Supprimer un article (DELETE)
  router.delete('/:id', async (req, res) => {
    try {
      const article = await Article.findByPk(req.params.id);
      if (!article) {
        return res.status(404).json({ message: 'Article non trouvé.' });
      }
      await article.destroy();
      res.status(200).json({ message: 'Article supprimé avec succès.' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'article.', error: error.message });
    }
  });
  
  module.exports = router;