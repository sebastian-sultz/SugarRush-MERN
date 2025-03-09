const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/CartController');
const ensureAuthentication = require('../Middlewares/Auth');

router.post('/add', ensureAuthentication, cartController.addToCart);
router.get('/', ensureAuthentication, cartController.getCart);
router.get('/count', ensureAuthentication, cartController.getCartCount);
router.post('/remove', ensureAuthentication, cartController.removeFromCart);
router.post('/update', ensureAuthentication, cartController.updateCartItem);
router.post('/clear', ensureAuthentication, cartController.clearCart);

module.exports = router;