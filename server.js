const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/product-bidding-mart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/users', require('./backend/routes/users'));
app.use('/api/products', require('./backend/routes/products'));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
