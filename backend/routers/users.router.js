import { Router } from 'express';
import * as userController from '../controllers/users.controller.js';
import verfiyToken from '../utils/verfiyToken.js';
import userRules from '../utils/user.Rules.js';
import allowedTo from '../middlewares/allowedTo.js';
const router = Router();

router.route('/').get(verfiyToken, userController.getUserInfo);

router.route('/register').post(userController.register);

router.route('/login').post(userController.login);

router.route('/').patch(verfiyToken, userController.updateUserInfo);

router
  .route('/:id')
  .delete(verfiyToken, allowedTo(userRules.ADMIN), userController.deleteUser)
  .patch(verfiyToken, allowedTo(userRules.ADMIN), userController.upgradeUser);
export default router;
