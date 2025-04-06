// server/routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('project root\server\controllers\authController.js');


// Test route
router.get('/test', (req, res) => {
    res.send('Auth route works!');
});

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
