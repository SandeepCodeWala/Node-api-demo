const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secretKey = 'your-secret-key'; // Replace with your actual secret key

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT
        const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });

        // Respond with the token
        res.json({ token:token,
            email:user.email,
          message:'Login Successfully'
         });

    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    login
};



// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if the password is correct
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(401).json({ error: "Incorrect password" });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ userId: user._id }, "your-secret-key", {
//       expiresIn: "1h",
//     });
//     const userID = user._id;

//     // Respond with token
//     res.json({ token, userID });
//   } catch (err) {
//     console.error("Error during login:", err);
//     res.status(500).json({ error: err?.message });
//   }
// };

// module.exports = {
//   login,
// };
