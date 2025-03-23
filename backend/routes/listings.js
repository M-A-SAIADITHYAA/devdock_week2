const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing
} = require('../controllers/listingController');

// Public routes
router.get('/', getListings);
router.get('/:id', getListing);

// Protected routes
router.post('/', auth, createListing);
router.put('/:id', auth, updateListing);
router.delete('/:id', auth, deleteListing);

module.exports = router; 