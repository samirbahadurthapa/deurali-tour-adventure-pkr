import TrekPackage from '../models/TrekPackage.js';

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
export const getPackages = async (req, res) => {
  try {
    const packages = await TrekPackage.find({});
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving packages', error: error.message });
  }
};

// @desc    Get single package by ID
// @route   GET /api/packages/:id
// @access  Public
export const getPackageById = async (req, res) => {
  try {
    const pkg = await TrekPackage.findById(req.params.id);
    if (pkg) {
      res.json(pkg);
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving package details', error: error.message });
  }
};

// @desc    Create a new package
// @route   POST /api/packages
// @access  Private (Admin)
export const createPackage = async (req, res) => {
  try {
    const { name, shortDescription, description, duration, price, image, location, difficulty, highlights, itinerary, maxGroupSize, bestSeason } = req.body;
    
    const pkgExists = await TrekPackage.findOne({ name });
    if (pkgExists) {
      return res.status(400).json({ message: 'Package with this name already exists' });
    }

    const newPkg = new TrekPackage({
      name, shortDescription, description, duration, price, image, location, difficulty, highlights, itinerary, maxGroupSize, bestSeason
    });

    const savedPkg = await newPkg.save();
    res.status(201).json(savedPkg);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating package', error: error.message });
  }
};

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Private (Admin)
export const updatePackage = async (req, res) => {
  try {
    const pkg = await TrekPackage.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const fieldsToUpdate = [
      'name', 'shortDescription', 'description', 'duration', 'price', 
      'image', 'location', 'difficulty', 'highlights', 'itinerary', 
      'maxGroupSize', 'bestSeason', 'rating'
    ];

    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        pkg[field] = req.body[field];
      }
    });

    const updatedPkg = await pkg.save();
    res.json(updatedPkg);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating package', error: error.message });
  }
};

// @desc    Delete a package
// @route   DELETE /api/packages/:id
// @access  Private (Admin)
export const deletePackage = async (req, res) => {
  try {
    const pkg = await TrekPackage.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    await TrekPackage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting package', error: error.message });
  }
};
