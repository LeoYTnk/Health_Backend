const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      success: false,
      message: 'Database connection failed',
      error: 'SERVICE_UNAVAILABLE'
    });
  }

  if (err.code === '23505') {
    return res.status(409).json({
      success: false,
      message: 'Resource already exists',
      error: 'CONFLICT'
    });
  }

  if (err.code === '23503') {
    return res.status(400).json({
      success: false,
      message: 'Invalid reference to related resource',
      error: 'BAD_REQUEST'
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: 'INTERNAL_SERVER_ERROR'
  });
};

module.exports = errorHandler;