import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { createProduct } from '../controller/auth.controller.js';
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

const router = express.Router();


router.post('/',authenticate,upload.array('image',7), createProduct);

export default router;