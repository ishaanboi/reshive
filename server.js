const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
});

// Base test route
app.get('/', (req, res) => {
    res.send('🔬 Researcher Hive API is running...');
});

// All routes (make sure these files exist and export routers)
const authRoutes = require('../server/routes/auth');
const profileRoutes = require('../server/routes/profile');
const networkingRoutes = require('../server/routes/networking');
const messagingRoutes = require('../server/routes/messaging');
const researchRoutes = require('../server/routes/research');

app.use('/api/auth', authRoutes);         // Login/Register — uses bcrypt & JWT
app.use('/api/profile', profileRoutes);
app.use('/api/networking', networkingRoutes);
app.use('/api/messages', messagingRoutes);
app.use('/api/research', researchRoutes); // File uploads etc.