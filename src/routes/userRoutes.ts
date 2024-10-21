import { Router } from 'express';
import { getUsers, getUser, createUserController, updateUserController, deleteUserController } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUserController);
router.put('/:userId', updateUserController);
router.delete('/:userId', deleteUserController);

export default router;
