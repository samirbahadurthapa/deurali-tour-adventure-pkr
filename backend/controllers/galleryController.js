import Gallery from '../models/Gallery.js';

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
export const getGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.find({}).sort({ createdAt: -1 });
    res.json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving gallery items', error: error.message });
  }
};

// @desc    Create new gallery item
// @route   POST /api/gallery
// @access  Private (Admin)
export const createGalleryItem = async (req, res) => {
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
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private (Admin)
export const deleteGalleryItem = async (req, res) => {
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
};
