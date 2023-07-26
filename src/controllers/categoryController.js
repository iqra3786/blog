const { responseError, responseOk } = require("../helper/helper");
const categoryModel = require("../models/categoryModel");
const userModel = require('../models/userModel');
const { isValidObjectId } = require("mongoose");

const createCategory = async function (req, res) {
  
    const { name } = req.body;
    if (!name){
      return responseError(req,res, "Category name is mandatory")
      
    }
     

    const catExist = await categoryModel.findOne({ name });
    if (catExist){
      return responseError(req,res, "This category already exists")

    }
    

    const data = await categoryModel.create(req.body);
    
 return responseOk(req,res,"Category added successfully",data)
};


const updateCategoryById = async function (req, res) {
  
    let data = req.body;
    const { name } = data;
    let catId = req.params.id;

    if (!isValidObjectId(catId)){

      return responseError(req,res,"Not a valid object Id")
    }
      

    let updatedCategory = await categoryModel.findByIdAndUpdate(
      { _id: catId },
      { $set: data },
      { new: true }
    );
    if (!updatedCategory){

      return responseError(req,res,"This categoy doesn't exist",null,404 )
    }
     
 
    return responseOk(req,res, "Category updated successfully",updatedCategory)
  
};


const getAllCategories = async function (req, res) {
  t
    const getAll = await categoryModel.find().select({ __v: 0 });
    if (!getAll){
      return responseError(req,res,"Can't get the categories",null,404)
      
    }
      
   return responseOk(req,res, "get all category successfully")
 
};


const getCatById = async function(req,res) {
  t
    let catId = req.params.id;
    const findCategory = await categoryModel.findById({_id:catId});
    if(!findCategory) {

      return responseError(req,res,"Category not found",null,404)
    }
    return responseOk(req,res,"get category successfully")

}


const deletecategoryById = async function (req, res) {
  
       let catId = req.params.id;
        let id = req.token.userId;
        const findUser = await userModel.findById({_id:id});
        let {role,permission} = findUser;
        
        let deleteFunc = async function(){
          const deletedCat = await categoryModel.findByIdAndDelete({ _id: catId });       
           if(!deletedCat) {

             return responseError(req,res,"No Such tag found",null,404)
           }
       return responseOk(req,res,"Category deleted successfully")
        }
        if(role =='Admin'){ 
            deleteFunc();
        }
        else if(permission.length !== 0) {
            if(permission.indexOf('Delete') !== -1){
                deleteFunc();
            }
        }
                
        else{
return responseError(req,res,"You are not allowed to do this action",null,403)
        }
                
  
};

module.exports = {
  createCategory,
  updateCategoryById,
  getAllCategories,
  deletecategoryById,
  getCatById
};