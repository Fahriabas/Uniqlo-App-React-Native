'use strict';
const {
  Model
} = require('sequelize');
const createSlug = require('../helpers/slug');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId"
      })
      Product.hasMany(models.Image, {
        foreignKey: "productId"
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    UserMongoId: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        min: {
          args: [100000],
          msg: "price min 100000"
        }
      }
    },
    mainImg: DataTypes.STRING,
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "id"
      }
    },
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  Product.beforeCreate((product) => {
    product.slug = createSlug(product.name)
  })
  return Product;
};