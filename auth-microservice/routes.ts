import { Router } from 'express';
import { getAllUsers, getUserById } from './src/controller/user.controller';
import { login, register } from './src/controller/auth.controller';

const router = Router();

router.post('/api/register', register);
router.post('/api/login', login);
router.get('/users', getAllUsers);
router.get('/users/:idUser', getUserById);

export default router;