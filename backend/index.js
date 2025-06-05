const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/db/connectDB.js');
const adminAuthRoutes = require('./src/routes/adminAuthRoutes.js');
const productRoutes = require("./src/routes/productRoutes.js");
const customRoutes = require("./src/routes/customRoutes.js");
const uploadRoutes = require("./src/routes/uploadRoute.js");
const contactRoutes = require("./src/routes/contactRoutes.js");
const blogRoutes = require('./src/routes/blogRoutes.js');
const fs = require('fs');
// CORS configuration
const allowedOrigins = [
    "http://localhost:5173",
    "https://localhost:5173",
    "http://65.108.1.122:8000",
    "https://sonateksteels.com",
    "http://sonateksteels.com"
];

// Initialize
dotenv.config();
connectDB();
const app = express();

// Middleware
// app.use(bodyParser.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Debug middleware
app.use((req, res, next) => {
    console.log('Request:', req.method, req.url);
    next();
});

// API Routes
app.use('/api/admin/auth', adminAuthRoutes);
 app.use('/api/admin/product', productRoutes);
app.use('/api/admin/product', customRoutes);
app.use("/api/admin/product", uploadRoutes);
app.use("/api", contactRoutes);
app.use('/api/admin', blogRoutes);

// Static files
app.use("/uploads", express.static("uploads"));

// Test routes
// app.get('/api/hello', (req, res) => {
//     res.json({ message: 'Hello from API' });
  
// });

// app.get("/", (req, res) => {
//     res.json({ message: "Server is working!" });
// });

// Serve static files
// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback: for React routes
// Catch-all for React SPA (after all API routes)
// Catch-all for React routes AFTER all API routes
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next(); // Pass to error middleware if no API route matched
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});