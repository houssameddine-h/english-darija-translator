import { Router } from 'express';
import { signup, login, currentUser, logout } from '../../controllers/authController.js';
import { requireAuth } from '../../middlewares/authMiddleware.js';

const router = Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/logout', logout);

router.get('/user', requireAuth, currentUser);

export default router;