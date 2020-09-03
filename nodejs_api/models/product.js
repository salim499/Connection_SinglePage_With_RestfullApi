const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { type: Number, required: true},
    name: { type: String, required: true},
    type: { type: String, required: true},
    price: { type: Number, required:true},
    rating: { type: String, required: true},
    warranty_years: { type: String, required: true},
    available: { type: String, required: true},
});

module.exports = mongoose.model('Product', productSchema);