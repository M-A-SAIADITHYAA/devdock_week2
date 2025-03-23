const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  language: {
    type: String,
    required: true,
    trim: true,
  },
  codeSnippet: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'inactive'],
    default: 'active',
  }
});

// Add text index for search functionality
listingSchema.index({ title: 'text', description: 'text', tags: 'text' });

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing; 