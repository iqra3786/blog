const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        lowercase:true,
        trim: true
    },
    short_description:{
        type:String,
        trim :true
    },
    userId:{
        type:ObjectId,
        ref:'User'
    },
    description:{
        type:String,
        trim:true
    },
    profile_image:{
        type:String,
    },
    
    category:{
        type:ObjectId,
        ref: 'Category'
    },
    subcategory:{
        type:String,
        trim:true,
        lowercase:true
    },
    tag:{
        type:ObjectId,
        ref:'Tag'
    },
    like:{
        type:Number,
        default:0
    },
    comment:{
        type:ObjectId,
        ref:'Comment',
        default:null
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date,
        default:null
    }
    //tag: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]

})


module.exports = mongoose.model('Post',postSchema)