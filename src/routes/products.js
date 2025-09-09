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


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products/public:
 *   get:
 *     summary: Public product listing with search and pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search keyword
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: per_page
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated product list
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, price]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "iPhone 14"
 *               description:
 *                 type: string
 *                 example: "Brand new Apple iPhone 14"
 *               price:
 *                 type: number
 *                 example: 1200
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://example.com/img1.jpg"]
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /products/me:
 *   get:
 *     summary: List my own products
 *     tags: [Products]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of user-owned products
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: A product object
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               images:
 *                 type: array
 *                 items: { type: string }
 *     responses:
 *       200:
 *         description: Product updated
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Product deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */

