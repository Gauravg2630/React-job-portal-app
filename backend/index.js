const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

const app = express();

// Middleware
app.use(cors({
  origin: 'https://react-job-portal-app-frontend.onrender.com',  // React frontend
  credentials: true,                // Allow cookies to be sent
}));
app.use(cookieParser());            // Parse cookies
app.use(express.json());            // Parse JSON bodies

// Test Route to verify API is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/auth', authRoutes);   // /api/auth/register, /login, etc.
app.use('/api/jobs', jobRoutes);    // /api/jobs endpoints

// Server Start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
