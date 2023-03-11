// import models
const Product = require('./Product');
const Category = require('./Category');
const Tags = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, { // REF: https://sequelize.org/docs/v6/core-concepts/assocs/
  foreignKey: 'category_id'
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id' // REF: https://sequelize.org/docs/v6/core-concepts/assocs/
});
// Products belongToMany Tags (through ProductTag)
Product.belongToMany(Tags, {  // REF: https://sequelize.org/docs/v6/core-concepts/assocs/
  through: ProductTag,
  as: 'productTag_products',
  foreignKey: 'product_id'
});
// Tags belongToMany Products (through ProductTag)
Tags.belongToMany(Product, { // REF: https://sequelize.org/docs/v6/core-concepts/assocs/
  through: ProductTag,
  as: 'productTag_products',
  foreignKey: 'tag_id'
})

module.exports = {
  Product,
  Category,
  Tags,
  ProductTag,
};
