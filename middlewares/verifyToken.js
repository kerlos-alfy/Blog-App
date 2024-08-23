const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  // eslint-disable-next-line no-undef
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded;

    next();
  });
};

// TODO : Verify if the user has the required role
exports.requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};
