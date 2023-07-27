const express=require('express')
const { asyncWrapper } = require('../helper/helper')
const{blogliked, commentOnBlog,commentReply}=require('../controllers/commentController')


const router=express.Router()

router.post('/add-likes',asyncWrapper(blogliked))
router.post('/add-comment',asyncWrapper(commentOnBlog))
router.post('/comments/:commentId/reply', asyncWrapper(commentReply))
 module.exports=router