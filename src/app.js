const express = require('express');
require('express-async-errors');
const cors = require('cors');
const { sequelize } = require('./models');
const config = require('./config');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const errorHandler = require('./middlewares/errorHandler');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");


const app = express();
app.use(cors());
app.use(express.json());
const path = require('path');
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



// Root route
app.get('/', (req, res) => {
  res.send('Server is up and running. Visit /api for more information.');
});
app.get('/api', (req, res) => {
res.redirect('/docs')
});
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


