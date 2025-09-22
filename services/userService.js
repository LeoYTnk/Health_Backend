const User = require('../models/User');

class UserService {
  static async createUser() {
    try {
      const user = await User.create();
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getUserProfile(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      const profile = await User.getProfile(userId);
      return { success: true, data: profile };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async updateUserProfile(userId, profileData) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      const { age, weight, height } = profileData;
      
      // Validate data
      if (age !== undefined && (age < 1 || age > 150)) {
        return { success: false, error: 'Age must be between 1 and 150' };
      }
      
      if (weight !== undefined && (weight < 1 || weight > 1000)) {
        return { success: false, error: 'Weight must be between 1 and 1000 kg' };
      }
      
      if (height !== undefined && (height < 50 || height > 300)) {
        return { success: false, error: 'Height must be between 50 and 300 cm' };
      }

      const updatedProfile = await User.updateProfile(userId, { age, weight, height });
      return { success: true, data: updatedProfile };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getUserWeightHistory(userId, limit) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      const history = await User.getWeightHistory(userId, limit);
      return { success: true, data: history };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getUserHeightHistory(userId, limit) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      const history = await User.getHeightHistory(userId, limit);
      return { success: true, data: history };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getCompleteUserData(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      const profile = await User.getProfile(userId);
      const weightHistory = await User.getWeightHistory(userId, 50);
      const heightHistory = await User.getHeightHistory(userId, 50);

      return {
        success: true,
        data: {
          profile,
          weightHistory,
          heightHistory
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = UserService;