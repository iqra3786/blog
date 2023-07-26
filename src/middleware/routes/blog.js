const express = require('express');
const router = express.Router();
const {createPost,getPostById, updatePost, getAllPosts,deletePostById,} = require('../blogController');
const {authentication, authorization} = require('../auth')
const {upload}=require('../imageUpload')

router.post('/create', authentication,authorization, upload.single('profile_image'),createPost);

router.get('/getPostById/:id', getPostById);

router.put('/update/:id', authentication, authorization,updatePost);

router.get('/getAll', getAllPosts);

router.delete('/delete/:id', authentication, authorization,deletePostById);



module.exports = router;