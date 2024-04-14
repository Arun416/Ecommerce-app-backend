const { getAllCategory } = require('../controllers/category.controllers');

const router = require('express').Router();

router.get('/category',getAllCategory);

module.exports = router;