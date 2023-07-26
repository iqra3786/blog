const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

// Define the schema for a reply
const replySchema = new mongoose.Schema({
  text: { type: String, required: true },
});

// Define the schema for a comment
const commentSchema = new mongoose.Schema({
  blogId:{type:ObjectId,
  ref: 'blog',
  required: true
},
  comment: { type: String, required: true },
  replies: [replySchema], // Subdocument array for replies
});

// Create the Comment model using the commentSchema
const Comment = mongoose.model('Comment', commentSchema);

// Export the Comment model
module.exports = Comment;