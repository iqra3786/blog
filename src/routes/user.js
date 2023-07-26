const express = require('express');
const router = express.Router();
const {createUser, login, googleSignIn} = require('../controllers/userController');

router.post('/signup',createUser);

router.post('/login',login);
router.post('/googleLogin', googleSignIn)


module.exports = router;