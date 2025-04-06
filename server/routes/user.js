// routes/user.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Assuming you have this
const User = require("./models/user"); // Your Mongoose User model

// GET /api/user/profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
