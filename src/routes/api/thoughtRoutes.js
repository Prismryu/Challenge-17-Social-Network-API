const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought
} = require('../../controllers/thoughtController');  // Ensure the correct path to your controller

// Define the routes
router.route('/')
  .get(getThoughts)      // Get all thoughts
  .post(createThought);  // Create a new thought

router.route('/:thoughtId')
  .get(getSingleThought)   // Get a single thought by ID
  .put(updateThought)      // Update thought by ID
  .delete(deleteThought);  // Delete a thought by ID

module.exports = router;
