const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

try {
  const userHealthRoutes = require('./routes/userHealthRoutes');
  app.use('/api/user-health', userHealthRoutes);
} catch (error) {
  console.error('Error loading routes:', error.message);
  console.error('Make sure all route files exist and export properly');
}

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: 'NOT_FOUND'
  });
});

try {
  const errorHandler = require('./middleware/errorHandler');
  app.use(errorHandler);
} catch (error) {
  console.error('Error loading error handler:', error.message);
  app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'INTERNAL_SERVER_ERROR'
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
});

module.exports = app;