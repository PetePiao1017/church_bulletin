const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    let admin_verified = false;
    let system_verified = false;

    // Verify system token
    jwt.verify(token, config.get('systemSecret'), (error, decoded) => {
      if (!error) {
        system_verified = true;
        req.verified = "system";
        req.user = decoded.user;
        next();
      } else {
        // Verify admin token only if system verification fails
        jwt.verify(token, config.get('adminSecret'), (adminError, adminDecoded) => {
          if (!adminError) {
            admin_verified = true;
            req.verified = "admin";
            req.user = adminDecoded.user;
            next();
          } 
          else {
            console.error('Token verification failed:', adminError.message);
            res.status(401).json({ msg: 'Token is not valid' });
          }
        });
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
