import { Router } from 'express';
import { deleteUser, getAllUsers, getUserById, updateUser } from './src/controller/user.controller';
import { login, register } from './src/controller/auth.controller';
import { createAddress, deleteAddress, getAddressById, getAllAddresses, updateAddress } from './src/controller/address.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.get('/users/:idUser', getUserById);
router.post('/users/:idUser', updateUser);
router.delete('/users/:idUser', deleteUser);

router.get('/addresses', getAllAddresses);
router.get('/addresses/:idAddress', getAddressById);
router.post('/addresses', createAddress);
router.put('/addresses/:idAddress', updateAddress);
router.delete('/addresses/:idAddress', deleteAddress);

export default router;