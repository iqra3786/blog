const postModel = require("../models/blogModel");
const { isValidObjectId } = require("mongoose");
const fs = require("fs");
const path = require("path");
const userModel = require('../models/userModel')
const mongoose=require('mongoose');
const tagModel = require("../models/tagModel");
const { responseError, responseOk } = require("../helper/helper");
const permissionModel = require("../models/permissionModel");


const createPost = async function (req, res) {
 
    let {
      title,
      short_description,
      description,
      category,
      subcategory,
      tag
    } = req.body;
    let image=req.file
    if(!image){
      
      return responseError(req,res, "image is required")
    }
     tag=JSON.parse(tag)
    
    
    const arrayOfObjectIds = tag.map(id => new mongoose.Types.ObjectId(id));
    console.log(arrayOfObjectIds)

    // Create an instance of the model and set the "tag" field with the array of ObjectIds
    const instance = new tagModel({ tag: arrayOfObjectIds });
    image = `${process.env.url}/image/${req.file.filename}`

    // let img = fs.readFileSync(profile_image);
    // profile_image = Buffer.from(img).toString("base64");
    // //console.log(profile_image)

    // let img2 = fs.readFileSync(featured_image);
    // featured_image = Buffer.from(img2).toString("base64");
    // //console.log(featured_image)

    const postCreated = await postModel.create({
      title,
      short_description,
      description,
      category,
      subcategory,
      tag:instance,
      profile_image:image,
      userId:req.token.userId
     
    });
    return responseOk(req,res,"Post added successfully",postCreated,201)
 
};


const getPostById = async function (req, res) {
  
    let postId = req.params.id;
    if (!isValidObjectId(postId)){
      return responseError(req,res,"Not a valid object id")
    }
      

    const findPost = await postModel.findById({ _id: postId });
    if (!findPost){
      return responseError(req,res,"Post doesn't exist",null,404)
    }
     

    
    
    let {
      title,
      profile_image,
      short_description,
      description,
      category,
      subcategory,
      tag,
    } = findPost;

    let data = {
      title,
      profile_image,
      tag,
      short_description,
      description: description,
      category,
      subcategory,
    };

   return responseOk(req,res, "get post successfully",data)
 
 
};





const getAllPosts = async function (req, res) {
 
    const postList = await postModel.find().populate('category').populate({path:'comment',select:'comment replies'});
    if (!postList){
      return responseError(req,res, "No post to show" ,null,404)
    }
      return responseOk(req,res,"get all post successfullly",postList)

   

};




const updatePost = async function (req, res) {
  
    
    let {
      title,
      short_description,
      description,
      category,
      subcategory,
      tag,
     
      
    } = req.body;

    let image=req.files

    const postId = req.params.id;

    if (!isValidObjectId(postId))
    {
      return responseError(req,res,"Not a valid object id")
    }
      if(image){
        image = `${process.env.url}/image/${req.file.filename}`

      }

        let data = {
          title,
          short_description,
          description,
          category,
          subcategory,
          tag,
          profile_image:image,
          
        }
        const blogDetails=await postModel.findOne({_id:postId})
        console.log(blogDetails)
        if(req.token.role == 'User'){
    
            if(blogDetails.userId==req.token.userId)
            {
              const updateBlog=await postModel.findOneAndUpdate({_id:postId},{ $set: data },
        
            {new:true})
            return responseOk(req,res,"Updated successfully",updateBlog)}
            else {
              return responseError(req,res,"Sorry, You can not edit.")
          }
        }


    const updatePost = await postModel.findByIdAndUpdate(
      { _id: postId },
      { $set: data },
      { new: true }
    );
    if (!updatePost){
      return responseError(req,res,"Post doesn't exist")
    }
      return responseOk(req,res,"Updated successfully",updatePost)
   
 
};




const deletePostById = async function (req, res) {
  
    const postId = req.params.id;
    let id = req.token.userId;
    const findUser = await userModel.findById({_id:id});
    let {role} = findUser;
    let data=await permissionModel.findOne({userId:id})
    let {permission}=data

    console.log(data)
   
    console.log(findUser)

    let deleteFunc = async function(){
        const deletedPost = await postModel.findByIdAndDelete({ _id: postId });
        if(!deletedPost){
          return responseError(req,res,"No Such post found",null,404)
        } 
        return responseOk(req,res,"Post deleted successfully")
        
    }

    if(role =='Admin'){ 
        deleteFunc();
    }
    else if(permission.length !== 0) {
        if(permission.indexOf('Delete') !== -1){
            deleteFunc();
        }
        else{
          return responseError(req,res,"You are not allowed to do this action",null,403)
        }
    }
    else{
      return responseError(req,res,"You are not allowed to do this action",null,403)

    }
    

}


module.exports = {
  createPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePostById,
  
};