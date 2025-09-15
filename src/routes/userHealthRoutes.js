const express = require('express');
const UserHealthController = require('../controllers/userHealthController');
const { 
  validateUserHealth, 
  validateUserHealthUpdate, 
  validateUserId 
} = require('../middleware/validation');

const router = express.Router();

// Create new user health data
router.post('/', validateUserHealth, UserHealthController.createUserHealth);

// Get all users health data
router.get('/', UserHealthController.getAllUsersHealth);

// Get user health data by ID
router.get('/:userId', validateUserId, UserHealthController.getUserHealth);

// Get user health data with analytics (BMI calculations)
router.get('/:userId/analytics', validateUserId, UserHealthController.getUserHealthWithAnalytics);

// Update user health data
router.put('/:userId', validateUserId, validateUserHealthUpdate, UserHealthController.updateUserHealth);

// Delete user health data
router.delete('/:userId', validateUserId, UserHealthController.deleteUserHealth);

module.exports = router;