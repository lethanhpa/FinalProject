const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String, required: [true, 'Category bắt buộc phải nhập'] },
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> afdaac66d33a0038597743d08f6566d45fb9dc8c
=======
>>>>>>> task/create-cart-cartDetail
  },
  {
    versionKey: false,
    timestamps: true
  },
);
categorySchema.set('toObject', { virtuals: true });

categorySchema.set('toJSON', { virtuals: true });

const Category = model('Category', categorySchema);

module.exports = Category;
