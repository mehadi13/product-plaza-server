// routes/userRoutes.js
import express from 'express';
import { findAll, create, find, deleteUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', findAll);
router.post('/', create);
router.get('/:id', find);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);

export default router;
