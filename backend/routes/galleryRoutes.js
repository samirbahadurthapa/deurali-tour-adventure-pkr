import express from 'express';
import Gallery from '../models/Gallery.js';

const router = express.Router();

// GET all gallery items
router.get('/', async (req, res) => {
  try {
    const galleryItems = await Gallery.find({}).sort({ createdAt: -1 });
    res.json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving gallery items', error: error.message });
  }
});

// POST new gallery item (Admin)
router.post('/', async (req, res) => {
  try {
    const { url, title, category, location } = req.body;
    
    if (!url || !title || !category || !location) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newItem = new Gallery({
      url, title, category, location
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error saving gallery item', error: error.message });
  }
});

// DELETE gallery item (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting gallery item', error: error.message });
  }
});

export default router;
