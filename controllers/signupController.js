const bcrypt = require('bcryptjs');
const User = require('../models/User');

const signup = async (req, res) => {
    const { name, email, password, age } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword, age });
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ error: err?.message });
    }
};

module.exports = {
    signup
};
