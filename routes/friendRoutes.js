const express = require('express');
const { getFriends, createFriend, deleteFriend, updateFriend } = require('../controllers/friendController');
const router = express.Router();
// const { , getUserById } = require('../controllers/userController'); // Adjust controller import as per your structure

// Route to get all users
router.get('/friends', getFriends);
router.post('/friends', createFriend);


// Route to get user by ID
router.get('/friends/:friendId', deleteFriend);
router.get('/friends/:friendId', updateFriend);


module.exports = router;
