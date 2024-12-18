const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById } = require('../controllers/userController'); // Adjust controller import as per your structure

// Route to get all users
router.get('/users', getAllUsers);

// Route to get user by ID
router.get('/user/:userId', getUserById);

module.exports = router;
