const express = require('express');
const categoryCtr = require('../controllers/categoryCtr');
const router = express.Router();

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.route('/category')
    .get(categoryCtr.getCategories)
    .post(auth, authAdmin, categoryCtr.creteCategory)


router.route('/category/:id')
    .delete(auth, authAdmin, categoryCtr.deleteCategory)
    .put(auth, authAdmin, categoryCtr.updateCategory)


module.exports = router; 