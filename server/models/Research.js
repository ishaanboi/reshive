const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: [String],
  description: String,
  fileUrl: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Research', researchSchema);
