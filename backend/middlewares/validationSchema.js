import { body } from 'express-validator';

export default () => {
  return [
    body('content')
      .notEmpty()
      .withMessage('content is required')
      .isLength({ min: 1 })
      .withMessage('content at leaset is 1 char'),
  ];
};
