// const User = require('../models/User'); // Replace with your User model import


// exports.getUserProfile = async (req, res) => {
//     const userId = req.params.userId;
  
//     try {
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       res.json(user);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   };

// profileController.js

const User = require('../models/User');

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch user details from the database
        const user = await User.findById(userId).select('-password'); // Exclude the password field

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getProfile
};
