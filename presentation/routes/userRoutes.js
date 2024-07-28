import { Router } from 'express';
import { signUp, login, initiateRegistration } from '../../interface/controllers/UserController.js';
const router = Router();

router.post('/initiateSignup', initiateRegistration);
router.post('/signup',signUp)
router.post('/login', login);

export default router;