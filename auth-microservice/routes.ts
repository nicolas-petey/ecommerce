import { Router } from 'express';
import { deleteUser, getAllUsers, getUserById, updateUser } from './src/controller/user.controller';
import { login, register } from './src/controller/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.get('/users/:idUser', getUserById);
router.post('/users/:idUser', updateUser);
router.delete('/users/:idUser', deleteUser);

export default router;