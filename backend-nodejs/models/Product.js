const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = Schema(
    {
        productName: { type: String, required: true },
        code: { type: String, required: true },
        price: { type: Number, min: 0, default: 0, required: true },
        discount: { type: Number, min: 0, max: 100, default: 0, required: true },
        stockQuantity: { type: Number, min: 0, default: 0, required: true },
        // imageId: { type: Schema.Types.ObjectId, ref: 'Media', required: false },
        categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
        reviewId: { type: Schema.Types.ObjectId, ref: 'Review', required: false },
        sizeId: { type: Schema.Types.ObjectId, ref: 'Review', required: false },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

// productSchema.virtual('productImages', {
//     ref: 'Media',
//     localField: 'imageId',
//     foreignField: '_id',
//     justOne: true,
// });

productSchema.virtual('category', {
    ref: 'Category',
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true,
});

productSchema.virtual('review', {
    ref: 'Review',
    localField: 'reviewId',
    foreignField: '_id',
    justOne: true,
});

productSchema.virtual('size', {
    ref: 'Size',
    localField: 'sizeId',
    foreignField: '_id',
    justOne: true,
});

productSchema.set('toObject', { virtuals: true });

productSchema.set('toJSON', { virtuals: true });

const Product = model('Product', productSchema);

module.exports = Product;