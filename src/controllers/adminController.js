const { responseError } = require('../helper/helper');
const permisssionModel = require('../models/permisssionModel');
const userModel = require('../models/userModel')

const updateRoleByAdmin = async function(req,res){
    try{
        let adminId = req.token.userId;
        let userId = req.params.id;
        let{role,permission}=req.body
       

        let findUser = await userModel.findById({_id:adminId});
        if(findUser.role !== 'Admin') 
        {
return responseError(req,res,"You are not allowed to do this action",null,403)
        }
        if(Object.keys(req.body).length == 0) return res.status(400).send({status:false, message:"Please provide data to update"})
        let updatedRole = await userModel.findByIdAndUpdate({_id:userId},{$set:{role:role}},{new:true});
        let data=(await permisssionModel.create({userId,permission})).populate('userId')
        return res.status(200).send({status:true,message:"Role updated successfully",data:updatedRole,permission:(await data).permission});
        
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}


const getUserDetails = async function(req,res){
    try{
        let adminId = req.token.userId;
        const findRole = await userModel.findById({_id:adminId});
        if(req.token.role !== 'Admin') return res.status(403).send({status:false, message:"You are not allowed to do this action"})
        return res.status(200).send({status:true, message:"User details found", data:findRole})
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message});
    }
}




module.exports = {updateRoleByAdmin,getUserDetails}