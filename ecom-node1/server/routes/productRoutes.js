const express = require('express');
const productsCtr = require('../controllers/productCtr');
const router = express.Router();


router.route('/product')
    .get(productsCtr.getProducts)
    .post(productsCtr.creteProducts)


router.route('/products/:id')
    .delete(productsCtr.deleteProducts)
    .put(productsCtr.updateProducts)


module.exports = router; 