const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({

	title: {
		type: String,
		required: [true, 'Title is Required']
	},
	content: {
		type: String,
		required: [true, 'Content is Required']
	},
	author: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'User',
	required: true
	},	

	creationDate: {
		type: Date, 
		default: Date.now
	},
	comments: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Comment' 
	}]

});


module.exports = mongoose.model('BlogPost', blogPostSchema);