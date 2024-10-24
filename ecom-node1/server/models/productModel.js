const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_Id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    tittle: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: { // Adjust this to be an object
        type: Object, // You can further define the structure of the object if needed
        required: true
    },
    category: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Products', productSchema);
