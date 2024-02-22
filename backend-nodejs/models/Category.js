const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String, required: [true, 'Category bắt buộc phải nhập'] },
    description: { type: String, required: true },

  },
  {
    versionKey: false,
    timestamps: true
  },
);
categorySchema.pre("create", function (next) {
  next();
});
const Category = model('Category', categorySchema);

module.exports = Category;
