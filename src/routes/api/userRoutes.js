const router = require('express').Router();
const { getUsers, createUser, getSingleUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/userController');


// Define the routes
router.route('/')
  .get(getUsers)  // Get all users
  .post(createUser);  // Create a new user

router.route('/:userId')
  .get(getSingleUser)   // Get user by ID
  .put(updateUser)      // Update user by ID
  .delete(deleteUser);  // Delete user by ID

router.route('/:userId/friends/:friendId')
  .post(addFriend)      // Add a friend
  .delete(removeFriend); // Remove a friend

module.exports = router;
