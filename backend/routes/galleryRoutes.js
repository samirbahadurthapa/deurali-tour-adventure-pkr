import express from 'express';
import { 
  getGalleryItems, 
  createGalleryItem, 
  deleteGalleryItem 
} from '../controllers/galleryController.js';

const router = express.Router();

// GET all gallery items
router.get('/', getGalleryItems);

// POST new gallery item (Admin)
router.post('/', createGalleryItem);

// DELETE gallery item (Admin)
router.delete('/:id', deleteGalleryItem);

export default router;
