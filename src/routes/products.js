const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');
const { protect } = require('../middlewares/auth');

router.get('/public', productCtrl.publicList);
router.get('/:id', productCtrl.getProduct);

// Auth routes
router.post('/', protect, productCtrl.createProduct);
router.get('/me', protect, productCtrl.getMyProducts);
router.put('/:id', protect, productCtrl.updateProduct);
router.delete('/:id', protect, productCtrl.deleteProduct);

module.exports = router;



