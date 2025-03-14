const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Define the schema fields here
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startingBid: {
    type: Number,
    required: true
  },
  currentBid: {
    type: Number,
    default: 0
  },
  bidEndTime: {
    type: Date,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bids: [{
    bidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: {
      type: Number,
      required: true
    },
    bidTime: {
      type: Date,
      default: Date.now
    }
  }]
});

module.exports = mongoose.model('Product', productSchema);