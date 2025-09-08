const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    images: { type: DataTypes.JSONB, allowNull: true, defaultValue: [] },
    ownerId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'products',
    timestamps: true
  });
  return Product;
};
