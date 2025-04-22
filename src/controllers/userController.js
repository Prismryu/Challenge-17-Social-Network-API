const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('friends').populate('thoughts');
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving users', error: err });
    }
  },

  // Get a single user by ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.userId)
        .populate('friends')
        .populate('thoughts');

      if (!user) return res.status(404).json({ message: 'User not found' });

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving user', error: err });
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
        console.log (err) 
      res.status(500).json({ message: 'Error creating user', error: err });
    }
  },

  // Update user by ID
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true, runValidators: true }
      );

      if (!user) return res.status(404).json({ message: 'User not found' });

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error updating user', error: err });
    }
  },

  // Delete user (and their thoughts)
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);

      if (!user) return res.status(404).json({ message: 'User not found' });

      // Delete thoughts associated with the user
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err });
    }
  },

  // Add friend
  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) return res.status(404).json({ message: 'User not found' });

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error adding friend', error: err });
    }
  },

  // Remove friend
  async removeFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) return res.status(404).json({ message: 'User not found' });

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error removing friend', error: err });
    }
  },
};
