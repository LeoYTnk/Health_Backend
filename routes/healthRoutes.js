const express = require('express');
const HealthController = require('../controllers/healthController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware); // All health routes require authentication

router.post('/records', HealthController.createRecord);
router.get('/records', HealthController.getHealthHistory);
router.get('/records/latest', HealthController.getLatestRecord);
router.get('/records/range', HealthController.getRecordsByDateRange);
router.delete('/records/:recordId', HealthController.deleteRecord);

module.exports = router;