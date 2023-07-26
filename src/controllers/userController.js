const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const axios=require('axios')

const createUser = async function(req,res) {
    try{
        let {email, phone, password,firstName, lastName,role} = req.body;
        console.log(role)
        
        if(!email) return res.status(400).send({status:false, message:"Please provide email Id "});
        const emailExist = await userModel.findOne({email});
        if(emailExist) return res.status(400).send({status:false, message:"This email Id already exists"})

        if(!phone) return res.status(400).send({status:false, message:"Please provide phone number"});        
        const phoneExist = await userModel.findOne({phone});
        if(phoneExist) return res.status(400).send({status:false,message:"This Phone No already exists"})

        if(!password) return res.status(400).send({status:false, message:"Please provide password"});
        if(!firstName) return res.status(400).send({status:false, message:"Please provide your first name"});
        if(!role) return res.status(400).send({status:false, message:"Please mention your role => Admin or Editor or Viewer"});

        let userCreated = await userModel.create(req.body);
        return res.status(201).send({status:true, message:"User Created Successfully",data:userCreated});
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}


const login = async function(req,res){
    try{
        let {email,password} = req.body;

        let findUser = await userModel.findOne({email, password});
        if(!findUser) return res.status(404).send({status:false, message:"User not found"});

        const token = jwt.sign({userId:findUser['_id'].toString(), role:findUser['role']}, 'secret-key');
        
        return res.status(200).send({status:true, message:"Logged In successufully", token:token})

    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}


const deleteUserById = async function(req,res){
    try{
        let userId = req.params.id;
        
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message});
    }
}

const googleAuth = async function (tokenId) {
    try {
      console.log(tokenId)
      const decode=jwt.decode(tokenId)
      console.log(decode)
      // const { data } = await axios.get(
      //   `https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`
      // );
      // console.log(data)
      return decode;
    } catch (err) {
      
      throw new Error(err.message);
    }
  };
  const googleAuthentication = async function (tokenId, res) {
    try {
      const { email, email_verified, given_name, error } = await googleAuth(
        tokenId
      );
      const decode=jwt.decode(tokenId)
      console.log(email);
      console.log("hi");
      if (error) {
        return res.status(401).send({ status: false, message: error });
      }
      let user = await userModel.findOne({ email:decode.email });
      //console.log(user);
      if (!user) {
        console.log("hii");
        const userCreated = await userModel.create({ email: decode.email ,firstName:decode.name,token:tokenId},);
        console.log(userCreated);
        return res
          .status(201)
          .send({ status: true, message: "User logged In successfully" });
      } else {
        console.log("Email Id already registered");
        return res
          .status(400)
          .send({ status: false, message: "Email Id already registered" });
      }
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };
  const googleSignIn = async function (req, res, next) {
    try {
      const { tokenId } = req.body;
      googleAuthentication(tokenId, res, next);
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };

module.exports = {createUser,login,googleSignIn}