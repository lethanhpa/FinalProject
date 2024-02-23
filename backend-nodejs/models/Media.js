const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const mediaSchema = new Schema(
<<<<<<< HEAD
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Media = model('Media', mediaSchema);
module.exports = Media;
=======
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

const Media = model('Media', mediaSchema);
module.exports = Media;
>>>>>>> task/create-cart-cartDetail
