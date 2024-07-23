import { Router } from 'express';
import { signUp, login } from '../../interface/controllers/UserController.js';
const router = Router();

router.post('/signup', signUp);
router.post('/login', login);

export default router;