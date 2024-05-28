import { sendResponse } from '../utils/Node.util.js';

const secret = process.env.JWT_SECRET_KEY;

export const authorizeMiddleware = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, secret, (err, decoded) => {
      if (err) {
        return sendResponse(
          res,
          401,
          'Unauthorizes access'
        );
      }
      req.body.userId = decoded._id; // add decoded._id to req.body
      next(); // call next middleware or route handler
    });
  } else {
    return sendResponse(res, 401, 'Unauthorized access');
  }
};
