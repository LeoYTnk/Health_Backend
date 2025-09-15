const UserHealthModel = require('../models/userHealthModel');

class UserHealthService {
  static async createUserHealth(userData) {
    try {
      const existingUser = await UserHealthModel.getUserHealthById(userData.user_id);
      if (existingUser) {
        throw new Error('User health data already exists. Use update instead.');
      }

      const newUserHealth = await UserHealthModel.createUserHealth(userData);
      return {
        success: true,
        data: newUserHealth,
        message: 'User health data created successfully'
      };
    } catch (error) {
      throw new Error(`Failed to create user health data: ${error.message}`);
    }
  }

  static async getUserHealthById(userId) {
    try {
      const userHealth = await UserHealthModel.getUserHealthById(userId);
      if (!userHealth) {
        throw new Error('User health data not found');
      }

      return {
        success: true,
        data: userHealth,
        message: 'User health data retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to retrieve user health data: ${error.message}`);
    }
  }

  static async updateUserHealth(userId, userData) {
    try {
      const existingUser = await UserHealthModel.getUserHealthById(userId);
      if (!existingUser) {
        throw new Error('User health data not found');
      }

      const updatedUserHealth = await UserHealthModel.updateUserHealth(userId, userData);
      return {
        success: true,
        data: updatedUserHealth,
        message: 'User health data updated successfully'
      };
    } catch (error) {
      throw new Error(`Failed to update user health data: ${error.message}`);
    }
  }

  static async deleteUserHealth(userId) {
    try {
      const deletedUser = await UserHealthModel.deleteUserHealth(userId);
      if (!deletedUser) {
        throw new Error('User health data not found');
      }

      return {
        success: true,
        data: deletedUser,
        message: 'User health data deleted successfully'
      };
    } catch (error) {
      throw new Error(`Failed to delete user health data: ${error.message}`);
    }
  }

  static async getAllUsersHealth() {
    try {
      const usersHealth = await UserHealthModel.getAllUsersHealth();
      return {
        success: true,
        data: usersHealth,
        message: 'All users health data retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to retrieve users health data: ${error.message}`);
    }
  }

  static calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return Math.round(bmi * 100) / 100;
  }

  static getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }

  static async getUserHealthWithAnalytics(userId) {
    try {
      const result = await this.getUserHealthById(userId);
      const userHealth = result.data;

      const bmi = this.calculateBMI(userHealth.weight, userHealth.height);
      const bmiCategory = this.getBMICategory(bmi);

      return {
        success: true,
        data: {
          ...userHealth,
          analytics: {
            bmi,
            bmi_category: bmiCategory
          }
        },
        message: 'User health data with analytics retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to retrieve user health analytics: ${error.message}`);
    }
  }
}

module.exports = UserHealthService;
