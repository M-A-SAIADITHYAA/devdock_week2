const Listing = require('../models/Listing');

// Create new listing
exports.createListing = async (req, res) => {
  try {
    const { title, description, price, language, codeSnippet, tags } = req.body;
    const listing = new Listing({
      title,
      description,
      price,
      language,
      codeSnippet,
      tags,
      seller: req.user.id,
    });

    await listing.save();
    res.status(201).json({ message: 'Listing created successfully', listing });
  } catch (error) {
    res.status(500).json({ message: 'Error creating listing', error: error.message });
  }
};

// Get all listings
exports.getListings = async (req, res) => {
  try {
    const { search, language, sort } = req.query;
    let query = { status: 'active' };

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Language filter
    if (language) {
      query.language = language;
    }

    // Sort options
    let sortOption = {};
    if (sort === 'price_asc') {
      sortOption = { price: 1 };
    } else if (sort === 'price_desc') {
      sortOption = { price: -1 };
    } else {
      sortOption = { createdAt: -1 };
    }

    const listings = await Listing.find(query)
      .sort(sortOption)
      .populate('seller', 'username email');

    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching listings', error: error.message });
  }
};

// Get single listing
exports.getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('seller', 'username email');
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching listing', error: error.message });
  }
};

// Update listing
exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this listing' });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: 'Listing updated successfully', listing: updatedListing });
  } catch (error) {
    res.status(500).json({ message: 'Error updating listing', error: error.message });
  }
};

// Delete listing
exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }

    await listing.remove();
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting listing', error: error.message });
  }
}; 