const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	
	blogPostId: { 
  		type: mongoose.Schema.Types.ObjectId, 
  		ref: 'BlogPost', required: true },
  	userId: {
		type: String, 
		required: [true, "User ID is Required"]
	},
	comment: {
		type: String,
		required: [true, "Comment is Required"]
	}
  }) 


module.exports = mongoose.model('Comment', commentSchema);
