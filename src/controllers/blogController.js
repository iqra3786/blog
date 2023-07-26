const postModel = require("../models/blogModel");
const { isValidObjectId } = require("mongoose");
const fs = require("fs");
const path = require("path");
const userModel = require('../models/userModel')
const mongoose=require('mongoose');
const tagModel = require("../models/tagModel");
//const ObjectId = mongoose.Schema.Types.ObjectId;

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
      // return helper.responseError(req,res,"image is required",null)
      return res.send({status:false,msg:"image is required"})
    }
     tag=JSON.parse(tag)
    // console.log(typeof(tag))
    //tag=tag.map(str=>new ObjectId(str))
    
    const arrayOfObjectIds = tag.map(id => new mongoose.Types.ObjectId(id));

    // Create an instance of the model and set the "tag" field with the array of ObjectIds
    const instance = new tagModel({ tag: arrayOfObjectIds });
    console.log(instance)
    
    console.log(tag)
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
     
    });
    return res
      .status(201)
      .send({
        status: true,
        message: "Post added successfully",
        data: postCreated,
      });
 
};


const getPostById = async function (req, res) {
  
    let postId = req.params.id;
    if (!isValidObjectId(postId))
      return res
        .status(400)
        .send({ status: false, message: "Not a valid object id" });

    const findPost = await postModel.findById({ _id: postId });
    if (!findPost)
      return res
        .status(404)
        .send({ status: false, message: "Post doesn't exist" });

    
    
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

    //profile_image = resolvedPath;   
    return res.status(200).send({ status: true, data: data });
 
};





const getAllPosts = async function (req, res) {
 
    const postList = await postModel.find();
    if (!postList)
      return res
        .status(404)
        .send({ status: false, message: "No post to show" });

    return res.status(200).send({ status: true, data: postList });

};




const updatePost = async function (req, res) {
  
    // let data = req.body;
    let {
      title,
      short_description,
      description,
      category,
      subcategory,
      tag,
      profile_image,
      
    } = req.body;

    const postId = req.params.id;

    if (!isValidObjectId(postId))
      return res
        .status(400)
        .send({ status: false, message: "Not a valid object id" });

       let image = `${process.env.url}/image/${req.file.filename}`

        let data = {
          title,
          short_description,
          description,
          category,
          subcategory,
          tag,
          profile_image:image,
          
        }


    const updatePost = await postModel.findByIdAndUpdate(
      { _id: postId },
      { $set: data },
      { new: true }
    );
    if (!updatePost)
      return res
        .status(404)
        .send({ status: false, message: "Post doesn't exist" });
    return res
      .status(200)
      .send({
        status: true,
        message: "Updated successfully",
        data: updatePost,
      });
 
};




const deletePostById = async function (req, res) {
  
    const postId = req.params.id;
    let id = req.token.userId;
    const findUser = await userModel.findById({_id:id});
    let {role,permission} = findUser;

    let deleteFunc = async function(){
        const deletedPost = await postModel.findByIdAndDelete({ _id: postId });
        if(!deletedPost) return res.status(404).send({status:false,message:"No Such post found"})
        return res.status(200).send({ status: true, message: "Post deleted successfully" });
    }

    if(role =='Admin'){ 
        deleteFunc();
    }
    else if(permission.length !== 0) {
        if(permission.indexOf('Delete') !== -1){
            deleteFunc();
        }
    }

    else return res.status(403).send({status: false,message: "You are not allowed to do this action"});

}

module.exports = {
  createPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePostById,
  
};