import express from 'express';
import UserController from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();
const userController = new UserController();

router.post('/register',userController.register);
router.post('/login',userController.login)
router.get('/me',protect,userController.getUser)
router.post('/logout',protect,userController.logout)

export default router