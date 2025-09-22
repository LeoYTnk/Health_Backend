const express = require('express');
const UserController = require('../controllers/userController');
const { validateUserProfile } = require('../middleware/validation');

const router = express.Router();

// Create a new user
router.post('/', UserController.createUser);

// Get user profile
router.get('/:userId', UserController.getUserProfile);

// Update user profile (age, weight, height)
router.put('/:userId', validateUserProfile, UserController.updateUserProfile);

// Get user weight history
router.get('/:userId/weight-history', UserController.getUserWeightHistory);

// Get user height history
router.get('/:userId/height-history', UserController.getUserHeightHistory);

// Get complete user data (profile + histories)
router.get('/:userId/complete', UserController.getCompleteUserData);

module.exports = router;