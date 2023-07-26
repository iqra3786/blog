const express = require('express');
const router = express.Router();
const {createPost,getPostById, updatePost, getAllPosts,deletePostById,} = require('../controllers/blogController');
const {authentication, authorization} = require('../../src/middleware/auth')
const {upload}=require('../middleware/imageUpload')
const {asyncWrapper}=require('../helper/helper')


router.post('/create', authentication,authorization, upload.single('profile_image'),asyncWrapper(createPost));

router.get('/getPostById/:id', getPostById);

router.put('/update/:id', authentication, authorization,updatePost);

router.get('/getAll', getAllPosts);

router.delete('/delete/:id', authentication, authorization,deletePostById);



module.exports = router;