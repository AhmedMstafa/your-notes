import jwt from 'jsonwebtoken';
import appError from '../utils/appError.js';
import * as httpStatusText from '../utils/httpStatusText.js';

export default (req, res, next) => {
  const authHeader =
    req.headers['Authorization'] || req.headers['authorization'];

  if (!authHeader) {
    const error = appError.create(
      'token is required',
      401,
      httpStatusText.ERROR
    );
    return next(error);
  }

  const token = authHeader.split(' ')[1];

  try {
    // eslint-disable-next-line no-undef
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    next();
  } catch {
    const error = appError.create('invalid token!', 401, httpStatusText.ERROR);
    return next(error);
  }
};
