const Friend = require('../models/Friend');

// Create a new friend
const createFriend = async (req, res) => {
    try {

        const { name, mobileNumber, gender } = req.body;
        const userId = req.user.id; // Extracted from the token by auth middleware

        const newFriend = new Friend({ userId, name, mobileNumber, gender });

        await newFriend.save();
        // console.log("req.params req.params",res.status(201).json(newFriend))

        res.status(201).json({
            message: 'Friend added successfully',
            friend: newFriend
        });
        // res.status(201).json(newFriend);
        // res.status(201).json({message: 'friend registered successfully'});
    } catch (err) {
        console.error('Error creating friend:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all friends for the authenticated user
const getFriends = async (req, res) => {
    try {
        const userId = req.user.id;
        const friends = await Friend.find({ userId });

        res.json(friends);
    } catch (err) {
        console.error('Error fetching friends:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a friend's information
const updateFriend = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, mobileNumber, gender } = req.body;
        const userId = req.user.id;

        const updatedFriend = await Friend.findOneAndUpdate(
            { _id: id, userId },
            { name, mobileNumber, gender },
            { new: true }
        );

        if (!updatedFriend) {
            return res.status(404).json({ error: 'Friend not found' });
        }
        res.status(201).json({
            message: 'Friend updated successfully',
            friend: updatedFriend
        });
        // res.json(updatedFriend);
    } catch (err) {
        console.error('Error updating friend:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a friend
const deleteFriend = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const deletedFriend = await Friend.findOneAndDelete({ _id: id, userId });

        if (!deletedFriend) {
            return res.status(404).json({ error: 'Friend not found' });
        }

        res.json({ message: 'Friend deleted successfully' });
    } catch (err) {
        console.error('Error deleting friend:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createFriend,
    getFriends,
    updateFriend,
    deleteFriend
};
