const express = require('express');
const router = express.Router();
const {
    Op
} = require('sequelize');
const User = require('../models/user.model');

// Login route
router.post('/login', async (req, res) => {
    const {
        mail,
        password
    } = req.body;

    try {
        console.log("Received login data:", req.body); // Log the received data

        const user = await User.findOne({
            where: {
                mail
            }
        });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        if (user.mdp !== password) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        res.status(200).json({
            message: "Login successful",
            user,
        });
    } catch (error) {
        console.error("Server error:", error); // Log the error in more detail
        res.status(500).json({
            message: "Server error",
            error: error.message || error
        });
    }
});


// Signup route
router.post('/signup', async (req, res) => {
    const {
        cin,
        name,
        mail,
        tel,
        birth,
        sex,
        mdp
    } = req.body;

    try {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{
                    cin
                }, {
                    mail
                }],
            },
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'User with this CIN or email already exists'
            });
        }

        // Create user with plain text password
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
            user: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to create user',
            error: error.message || error,
        });
    }
});

module.exports = router; // Ensure the router is exported