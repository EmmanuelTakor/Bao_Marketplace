const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/public', productCtrl.publicList);
router.get('/me', protect, productCtrl.getMyProducts);
router.get('/:id', productCtrl.getProduct);

// Auth routes
router.post('/', protect, upload.array('images', 5), productCtrl.createProduct);
router.put('/:id', protect, upload.array('images', 5), productCtrl.updateProduct);
router.delete('/:id', protect, productCtrl.deleteProduct);

module.exports = router;



