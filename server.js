// server.js

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const xssClean = require('xss-clean');

// Import routes
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Admin Routes

// Import middlewares
const { authenticateToken } = require('./middleware/authMiddleware'); // Correct middleware import
const errorMiddleware = require('./middleware/errorMiddleware');

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers
app.use(xssClean()); // Prevent XSS attacks

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully...'))
  .catch(err => console.log('Database connection error: ', err));

// Routes
app.use('/api/auth', authRoutes); // No authentication needed
app.use('/api/customers', authenticateToken, customerRoutes); // Authentication middleware
app.use('/api/products', authenticateToken, productRoutes); // Authentication middleware
app.use('/api/orders', authenticateToken, orderRoutes); // Authentication middleware
app.use('/api/cart', authenticateToken, cartRoutes); // Authentication middleware
app.use('/api/wishlist', authenticateToken, wishlistRoutes); // Authentication middleware
app.use('/api/reviews', authenticateToken, reviewRoutes); // Authentication middleware
app.use('/api/payments', authenticateToken, paymentRoutes); // Authentication middleware
// Mount the admin routes
app.use('/api/admin', adminRoutes);  // Make sure this matches the desired endpoint structur


// Global error handling middleware
app.use(errorMiddleware); // Put this last, after routes

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown (optional for production)
process.on('SIGINT', () => {
  console.log('SIGINT received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed.');
      process.exit(0);
    });
  });
});
