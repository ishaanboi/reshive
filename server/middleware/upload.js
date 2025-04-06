const multer = require('multer');
const path = require('path');

// Define storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Filter file types if needed (optional)
const fileFilter = (req, file, cb) => {
    // Accept all for now
    cb(null, true);
};

// Init multer
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
