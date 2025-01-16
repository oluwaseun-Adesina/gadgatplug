const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'gadgets',
    allowed_formats: ['jpeg', 'jpg', 'png', 'gif'],
  },
});

const upload = multer({ storage });

module.exports = upload;
