const express = require('express');
const router = express.Router();
const {createUser, login, googleSignIn} = require('../controllers/userController');
const {asyncWrapper}=require('../helper/helper')

router.post('/signup',asyncWrapper(createUser));

router.post('/login',asyncWrapper(login));
router.post('/googleLogin', googleSignIn)


module.exports = router;