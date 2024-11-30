const express = require('express');
const Admin = require('../models/admin.model'); // Import the Admin model

const router = express.Router();

// CREATE: Add a new admin
router.post('/signup', async (req, res) => {
  const { name, password } = req.body;

  try {
    const newAdmin = await Admin.create({ name, password });
    res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create admin', error });
  }
});

router.post('/login', async (req, res) => {
    const { name, password } = req.body;
  
    try {
      const admin = await Admin.findOne({where: {name}});
      if(admin.password===password){
        res.status(200).json({ message: 'Welcome admin', admin });
      }
      else{
        res.status(401).json({message: 'Wrong password'});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create admin', error });
    }
  });

// READ: Get all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch admins', error });
  }
});

// READ: Get a single admin by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByPk(id);
    if (admin) {
      res.status(200).json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch admin', error });
  }
});

// UPDATE: Update an admin
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;

  try {
    const admin = await Admin.findByPk(id);
    if (admin) {
      admin.name = name || admin.name;
      admin.password = password || admin.password;
      await admin.save();
      res.status(200).json({ message: 'Admin updated successfully', admin });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update admin', error });
  }
});

// DELETE: Delete an admin
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByPk(id);
    if (admin) {
      await admin.destroy();
      res.status(200).json({ message: 'Admin deleted successfully' });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete admin', error });
  }
});

module.exports=router;
