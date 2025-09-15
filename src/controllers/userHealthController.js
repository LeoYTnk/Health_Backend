const UserHealthService = require('../services/userHealthService');
const { validateUserHealth, validateUserId } = require('../middleware/validation');

class UserHealthController {
  static async createUserHealth(req, res) {
    try {
      const result = await UserHealthService.createUserHealth(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
        error: 'BAD_REQUEST'
      });
    }
  }

  static async getUserHealth(req, res) {
    try {
      const { userId } = req.params;
      const result = await UserHealthService.getUserHealthById(userId);
      res.status(200).json(result);
    } catch (error) {
      const statusCode = error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message,
        error: statusCode === 404 ? 'NOT_FOUND' : 'BAD_REQUEST'
      });
    }
  }

  static async updateUserHealth(req, res) {
    try {
      const { userId } = req.params;
      const result = await UserHealthService.updateUserHealth(userId, req.body);
      res.status(200).json(result);
    } catch (error) {
      const statusCode = error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message,
        error: statusCode === 404 ? 'NOT_FOUND' : 'BAD_REQUEST'
      });
    }
  }

  static async deleteUserHealth(req, res) {
    try {
      const { userId } = req.params;
      const result = await UserHealthService.deleteUserHealth(userId);
      res.status(200).json(result);
    } catch (error) {
      const statusCode = error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message,
        error: statusCode === 404 ? 'NOT_FOUND' : 'BAD_REQUEST'
      });
    }
  }

  static async getAllUsersHealth(req, res) {
    try {
      const result = await UserHealthService.getAllUsersHealth();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
        error: 'BAD_REQUEST'
      });
    }
  }

  static async getUserHealthWithAnalytics(req, res) {
    try {
      const { userId } = req.params;
      const result = await UserHealthService.getUserHealthWithAnalytics(userId);
      res.status(200).json(result);
    } catch (error) {
      const statusCode = error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message,
        error: statusCode === 404 ? 'NOT_FOUND' : 'BAD_REQUEST'
      });
    }
  }
}

module.exports = UserHealthController;