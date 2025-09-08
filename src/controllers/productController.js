const { Product } = require('../models');
const { productCreateSchema, productUpdateSchema } = require('../validators/validators');

async function createProduct(req, res, next) {
  try {
    const { error, value } = productCreateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const created = await Product.create({ ...value, ownerId: req.user.id });
    res.status(201).json(created);
  } catch (err) { next(err); }
}

async function getMyProducts(req, res, next) {
  try {
    const prods = await Product.findAll({ where: { ownerId: req.user.id }, order: [['createdAt', 'DESC']] });
    res.json(prods);
  } catch (err) { next(err); }
}

async function getProduct(req, res, next) {
  try {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (err) { next(err); }
}

async function updateProduct(req, res, next) {
  try {
    const { error, value } = productUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    if (p.ownerId !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await p.update(value);
    res.json(p);
  } catch (err) { next(err); }
}

async function deleteProduct(req, res, next) {
  try {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    if (p.ownerId !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await p.destroy();
    res.status(204).send();
  } catch (err) { next(err); }
}

async function publicList(req, res, next) {
  try {
    const q = req.query.q || null;
    const page = Math.max(1, parseInt(req.query.page || 1));
    const perPage = Math.min(100, Math.max(1, parseInt(req.query.per_page || 10)));
    const offset = (page - 1) * perPage;

    const where = {};
    if (q) {
      where.$or = [
        { title: { [require('sequelize').Op.iLike]: `%${q}%` } },
        { description: { [require('sequelize').Op.iLike]: `%${q}%` } }
      ];
    }

    const { count, rows } = await Product.findAndCountAll({
      where,
      order: [['createdAt','DESC']],
      offset,
      limit: perPage
    });

    res.json({
      total: count,
      page,
      perPage,
      items: rows
    });
  } catch (err) { next(err); }
}

module.exports = { createProduct, getMyProducts, getProduct, updateProduct, deleteProduct, publicList };
