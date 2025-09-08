const { Sequelize } = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize(config.databaseUrl, {
  logging: false,
  dialectOptions: { ssl: false }
});

const User = require('./user')(sequelize);
const Product = require('./product')(sequelize);

User.hasMany(Product, { foreignKey: 'ownerId', as: 'products' });
Product.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

module.exports = { sequelize, User, Product };
