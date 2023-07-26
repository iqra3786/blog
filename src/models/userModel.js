const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        
    },
    password:{
        type:String,
       

    },
    firstName:{
        type:String,
        required:true

    },
    lastName:{
        type:String,
       

    },
    role:{
        type:String,
        enum:['Admin','User'],
        required:true,
        default:'User'
    },
    permission:{
        type:[String],
        enum:['Create','Read','Update','Delete']
    },
    token:{
        type:String,
        default:null
    }

},{timestamps:true})


module.exports = mongoose.model('User',userSchema)