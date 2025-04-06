const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Research = require('../models/Research');

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { title, tags, description } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;

    const research = new Research({
      title,
      tags: tags.split(',').map(tag => tag.trim()),
      description,
      fileUrl
    });

    await research.save();
    res.status(200).json({ msg: 'Upload successful', research });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Upload failed' });
  }
});

module.exports = router;
