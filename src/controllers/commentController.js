const {responseOk}=require('../helper/helper')
const blogModel=require('../models/blogModel')
const commentModel=require('../models/commentModel')

exports.commentOnBlog=async(req,res)=>{
    let{blogId,comment}=req.body
    const newComment = await commentModel.create({blogId:blogId,comment });
   const updateBlog=await blogModel.findOneAndUpdate({_id:blogId},{$set:{comment:newComment._id}},{new:true})
   
      
    responseOk(req,res,"comment on blog successfully.",newComment)
}

exports.commentReply=async(req,res)=>{

    const { commentId } = req.params;
    const {text } = req.body;
  
    const comment = await commentModel.findById(commentId).populate("blogId");
      
       
    comment.replies.push({ text });
    await comment.save();
    responseOk(req,res, "reply on comment sucessfully.",comment)

 
}

exports.blogliked=async(req,res)=>{
    let {blogId,like}=req.body
    let data=await blogModel.findByIdAndUpdate(
        {_id:blogId,isDeleted:false},{$inc:{like:1}},{new:true}
    )
    return responseOk(req,res,"add like successfully.",data)

}