const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: false },
    desc: { type: String, required: false },
    price:{ type: Number, required: false },
    productImage: { type: Array, require: false }
});

module.exports =mongoose.model('GiftProduct', productSchema);