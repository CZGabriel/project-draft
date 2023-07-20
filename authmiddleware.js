import { verify } from 'jsonwebtoken';
import { accessTokenSecret as _accessTokenSecret } from './config';

const accessTokenSecret = _accessTokenSecret;

var authenticateToken = (req, res, next) => {
  // Get the token from the request header or query parameters
  var token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

export default authenticateToken;
