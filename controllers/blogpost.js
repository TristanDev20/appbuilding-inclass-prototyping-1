const User = require('../models/User');
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

const auth = require('../auth');

const {errorHandler} = auth;

module.exports.addBlogPost = (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  BlogPost.findOne({ title })
    .then(existingBlogPost => {
      if (existingBlogPost) {
        return res.status(409).send({ message: 'Blog post with the same title already exists' });
      }

      const newBlogPost = new BlogPost({
        title: title,
        content: content,
        author: req.user.id 
      });

      return newBlogPost.save()
        .then(result => {
          res.status(201).send({
            message: 'Blog post created successfully',
            blogPost: result
          });
        })
        .catch(error => errorHandler(error, req, res));
    })
    .catch(error => errorHandler(error, req, res));
};


module.exports.getAllBlogPost = (req, res) => {
	return BlogPost.find({})
	 .then(blogposts => {
	 	res.status(200).send(blogposts);
	 })
	 .catch(error => errorHandler(error, req, res));
};

module.exports.getBlogPost = (req, res) => {
	const blogPostId = req.params.blogPostId;

	if(!mongoose.Types.ObjectId.isValid(blogPostId)){
		return res.status(400).send({ message: 'Invalid blog post ID'});
	}

	BlogPost.findById(blogPostId)
		.then(blogpost => {
			if(blogpost) {
				return res.status(200).send(blogpost);
			} else {
				return res.status(404).send({ message: 'Blog Post not found'});
			}
		})
		.catch(error => errorHandler(error, req, res));
};



module.exports.updateBlogPost = (req, res) => {
  const blogPostId = req.params.blogPostId;

  if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
    return res.status(400).send({ message: 'Invalid blog post ID' });
  }

  
  BlogPost.findById(blogPostId)
    .then(blogPost => {
      if (!blogPost) {
        return res.status(404).send({ message: 'No blog post found' });
      }

        if (blogPost.author.toString() !== req.user.id) {
        return res.status(403).send({ message: 'Forbidden: You do not own this post' });
      }

      blogPost.title = req.body.title || blogPost.title;
      blogPost.content = req.body.content || blogPost.content;

      return blogPost.save()
        .then(updated => {
          return res.status(200).send({
            message: 'Blog post updated successfully',
            blogPost: updated
          });
        })
        .catch(error => errorHandler(error, req, res));
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.deleteBlogPost = (req, res) => {
  const blogPostId = req.params.blogPostId;

  if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
    return res.status(400).send({ message: 'Invalid blog post ID' });
  }

  BlogPost.findById(blogPostId)
    .then(post => {
      if (!post) {
        return res.status(404).send({ message: 'Blog post not found' });
      }

      if (req.user.isAdmin || post.author.toString() === req.user.id) {
        // Step 3: Delete if authorized
        return BlogPost.findByIdAndDelete(blogPostId)
          .then(() => {
            res.status(200).send({ message: 'Blog post deleted successfully' });
          });
      } else {
        return res.status(403).send({ message: 'Forbidden: You cannot delete this post' });
      }
    })
    .catch(error => errorHandler(error, req, res));
};


module.exports.addComment = (req, res) => { 
  const newComment = new Comment({
    blogPostId: req.params.blogPostId,
    userId: req.user.id,
    comment: req.body.comment
  });

  return newComment.save()
    .then(comment => {

      return res.status(200).send({
        message: 'Comment added successfully',
        comment: comment
      });
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.getAllComments = (req, res) => {
  return Comment.find({ blogPostId: req.params.blogPostId })
    .then(comments => {
      return res.status(200).send(comments);
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.deleteComment = (req, res) => {
  console.log("Comment ID to delete:", req.params.commentId);

  if(!req.user.isAdmin){
    return res.status(403).send({ message: 'Unauthorized user is forbidden'})
  }

  return Comment.findByIdAndDelete(req.params.commentId)
    .then(comment => {
      if(comment) {
        res.status(200).send({
          message: 'Comment deleted successfully'
        });
      } else {
        res.status(400).send({ message: 'No Comment found'});
      }
    })
    .catch(error => errorHandler(error, req, res));
};





