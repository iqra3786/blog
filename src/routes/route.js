const express = require('express');
const router = express.Router();
const postRoute = require('./blog');
const tagRoute = require('./tag');
const categoryRoute = require('./category');
const userRoute = require('./user');
const adminRoute = require('./admin')
const commentRoute=require('./commentOrLike')

router.use('/tag', tagRoute);

router.use('/category', categoryRoute);

router.use('/post', postRoute);

router.use('/user', userRoute);

router.use('/admin',adminRoute);
router.use('/comment',commentRoute)



module.exports = router;

