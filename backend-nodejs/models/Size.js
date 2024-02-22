const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const sizeDetailSchema = new Schema(
    {
        size: { type: String },
    },
    {
        _id: false // Không cần tạo _id riêng cho mỗi size
    }
);

const sizeSchema = new Schema(
    {
        sizes: [sizeDetailSchema],
    },
    {
        versionKey: false,
        timestamps: true
    }
);

sizeSchema.set('toObject', { virtual: true });

sizeSchema.set('toJSON', { virtual: true });

const Size = model('Size', sizeSchema);

module.exports = Size;