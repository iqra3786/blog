const express = require('express');
const router = express.Router();
const { createUser, login, googleSignIn, logout } = require('../controllers/userController');
const { asyncWrapper } = require('../helper/helper')
const { authentication } = require('../middleware/auth')





router.post('/signup', asyncWrapper(createUser));

router.post('/login', asyncWrapper(login));
router.post('/googleLogin', googleSignIn)

router.post('/logout', authentication, asyncWrapper(logout))



module.exports = router;