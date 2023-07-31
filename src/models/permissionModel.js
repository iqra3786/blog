const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const permissionSchema = new mongoose.Schema({
 userId:{
        type:ObjectId,
        ref:'User'
    },

    permission: {
        type: [String],
        enum: ['Create', 'Read', 'Update', 'Delete']
    },



   

},{timestamps:true})


module.exports = mongoose.model('permission',permissionSchema)