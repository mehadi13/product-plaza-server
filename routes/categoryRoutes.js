// routes/userRoutes.js
import express from 'express';
import { findAll, create, update, find, deleteCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', findAll);
router.post('/', create);
router.get('/:id', find);
router.put('/:id', update);
router.delete('/:id', deleteCategory);

export default router;