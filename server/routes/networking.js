const express = require('express');
const router = express.Router();
const {
    searchResearchers,
    sendRequest,
    acceptRequest,
    getConnections
} = require('../controllers/networkingController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/search', authMiddleware, searchResearchers);
router.post('/request', authMiddleware, sendRequest);
router.put('/accept/:id', authMiddleware, acceptRequest);
router.get('/connections', authMiddleware, getConnections);

module.exports = router;
