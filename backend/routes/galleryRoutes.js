import express from 'express';
import { 
  getGalleryItems, 
  createGalleryItem, 
  deleteGalleryItem 
} from '../controllers/galleryController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET all gallery items
router.get('/', getGalleryItems);

// POST new gallery item (Admin)
router.post('/', requireAuth, createGalleryItem);

// DELETE gallery item (Admin)
router.delete('/:id', requireAuth, deleteGalleryItem);

export default router;
