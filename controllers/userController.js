const { validationResult } = require('express-validator');
const UserService = require('../services/userService');

class UserController {
  static async createUser(req, res) {
    try {
      const result = await UserService.createUser();
      
      if (result.success) {
        res.status(201).json({
          success: true,
          message: 'User created successfully',
          data: result.data
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getUserProfile(req, res) {
    try {
      const { userId } = req.params;
      const result = await UserService.getUserProfile(parseInt(userId));
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data
        });
      } else {
        const statusCode = result.error === 'User not found' ? 404 : 400;
        res.status(statusCode).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async updateUserProfile(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { userId } = req.params;
      const { age, weight, height } = req.body;
      
      const result = await UserService.updateUserProfile(parseInt(userId), { age, weight, height });
      
      if (result.success) {
        res.json({
          success: true,
          message: 'Profile updated successfully',
          data: result.data
        });
      } else {
        const statusCode = result.error === 'User not found' ? 404 : 400;
        res.status(statusCode).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getUserWeightHistory(req, res) {
    try {
      const { userId } = req.params;
      const limit = parseInt(req.query.limit) || 50;
      
      const result = await UserService.getUserWeightHistory(parseInt(userId), limit);
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data
        });
      } else {
        const statusCode = result.error === 'User not found' ? 404 : 400;
        res.status(statusCode).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getUserHeightHistory(req, res) {
    try {
      const { userId } = req.params;
      const limit = parseInt(req.query.limit) || 50;
      
      const result = await UserService.getUserHeightHistory(parseInt(userId), limit);
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data
        });
      } else {
        const statusCode = result.error === 'User not found' ? 404 : 400;
        res.status(statusCode).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getCompleteUserData(req, res) {
    try {
      const { userId } = req.params;
      
      const result = await UserService.getCompleteUserData(parseInt(userId));
      
      if (result.success) {
        res.json({
          success: true,
          data: result.data
        });
      } else {
        const statusCode = result.error === 'User not found' ? 404 : 400;
        res.status(statusCode).json({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = UserController;