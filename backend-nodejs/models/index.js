const Category = require('./Category');
<<<<<<< HEAD
const productImages = require('./Media');
const Reviews = require('./Review');
const Product = require('./Product');
const Size = require('./Size');

module.exports = { Category, productImages, Reviews, Product, Size };
=======
const Order = require('./Order');
const Product = require('./Product');
const productImages = require('./Media');
const Review = require('./Review');
const Size = require('./Size');
const ShippingAddress = require('./ShippingAddress');
const Customer = require('./Customer');
const Employee = require('./Employee');
const Cart = require('./Cart');

module.exports = {
    Category, Order, Product, productImages, Review, Size, ShippingAddress, Customer, Employee, Cart
};
>>>>>>> task/create-cart-cartDetail
