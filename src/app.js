const express = require('express');
require('express-async-errors');
const cors = require('cors');
const { sequelize } = require('./models');
const config = require('./config');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Basic health
app.get('/health', (req,res) => res.json({ ok: true }));

// Error handler (last)
app.use(errorHandler);

// Sync DB (for dev). In production use migrations.
async function init() {
  await sequelize.sync();
}
init();

module.exports = app;
