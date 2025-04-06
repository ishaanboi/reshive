const Research = require('../models/Research');
const path = require('path');
const fs = require('fs');

exports.uploadResearch = async (req, res) => {
  try {
    const { title, tags, description } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const newResearch = new Research({
      title,
      tags: tags.split(',').map(t => t.trim()),
      description,
      fileUrl: file.filename,
      uploadedBy: req.user.id
    });

    await newResearch.save();
    res.status(201).json({ message: 'Research uploaded successfully', data: newResearch });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
