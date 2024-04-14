const router = require('express').Router();
const {createSellers,login} = require('../controllers/seller.controllers');

router.post('/seller-signup',createSellers);
router.post('/seller-login',login);

module.exports = router;