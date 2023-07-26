const {responseOk}=require('../helper/helper')

exports.commentOnBlog=async(req,res)=>{
    let{blogId,comment}=req.body
    const newComment = (await commentModel.create({blogId:blogId,comment })).populate("blogId");
      
    return responseOk(req,res,"comment on blog successfully.",newComment)
}

exports.commentReply=async(req,res)=>{

    const { commentId } = req.params;
    const {text } = req.body;
  
    const comment = await commentModel.findById(commentId).populate("blogId");
      
       
    comment.replies.push({ text });
    await comment.save();
    helper.responseOk(req,res, "reply on comment sucessfully.",comment)

 
}

exports.blogliked=async(req,res)=>{
    let {blogId,like}=req.body
    let data=await blogModel.findByIdAndUpdate(
        {_id:blogId,isDeleted:false},{$inc:{like:1}},{new:true}
    )
    return helper.responseOk(req,res,"add like successfully.",data)

}