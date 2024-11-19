const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_jwt_secret_key';

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  });
};

module.exports = { authenticate };
