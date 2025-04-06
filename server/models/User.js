const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    profilePicture: { type: String, default: '' },
    bio: { type: String, default: '' },
    institution: { type: String, default: '' },
    researchInterests: [{ type: String }],
    publications: [{ type: String }],
    achievements: [{ type: String }],
    socialLinks: {
        linkedin: String,
        twitter: String,
        researchGate: String,
        googleScholar: String,
        orcid: String,
        publons: String,
        scopus: String
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
