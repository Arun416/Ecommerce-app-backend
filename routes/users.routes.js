const router = require('express').Router();
const {createUsers,login, getUser} = require('../controllers/users.controllers');
const {authentication} = require('../config/authentication')

router.post('/signUp',createUsers);
router.post('/login',login);
router.get('/user',getUser);

module.exports = router;