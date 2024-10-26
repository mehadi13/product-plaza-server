// routes/userRoutes.js
import express from 'express';
import { findAll, findByCategory, create, find, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', findAll);
router.get('/filter', findByCategory);
router.post('/', create);
router.get('/:id', find);
router.delete('/:id', deleteProduct);

export default router;
