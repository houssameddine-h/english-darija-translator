import { Router } from 'express';
import { translate } from '../../controllers/translationController.js';
// import { signup, login, currentUser } from '../../controllers/authController.js';
// import { requireAuth } from '../../middlewares/authMiddleware.js';

const router = Router();

router.post('/', translate);

export default router;