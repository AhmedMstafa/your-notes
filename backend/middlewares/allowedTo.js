import appError from '../utils/appError.js';

export default (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(appError.create('this role in not authrized', 401));
    }
    next();
  };
};
