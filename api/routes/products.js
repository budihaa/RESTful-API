const express = require('express');
const router = express.Router();

// import controller
const productController = require('./../controllers/products');

// middleware for auth user
const checkAuth = require('./../middleware/checkAuth');

// package for upload file
const multer = require('multer');

// Config: path upload & filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const now = new Date().toISOString();
    const date = now.replace(/:/g, '-');
    cb(null, date + file.originalname);
  },
});

// Config: file types
const fileFilter = (req, file, cb) => {
  // only accept JPEG & PNG
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error("File's format must be JPEG/PNG"), false);
  }
};

const upload = multer({
  fileFilter: fileFilter,
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // limit file sampe 5 MB
  },
});

router.get('/', productController.getAllProducts);

// upload.single('nama_field') = cuman bisa upload 1 file
router.post(
  '/',
  checkAuth,
  upload.single('productImage'),
  productController.createProduct
);

router.get('/:productId', productController.getSingleProduct);

router.patch('/:productId', checkAuth, productController.updateProduct);

router.delete('/:productId', checkAuth, productController.deleteProduct);

module.exports = router;
