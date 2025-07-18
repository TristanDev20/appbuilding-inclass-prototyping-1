const express = require('express');
const blogPostController = require("../controllers/blogpost");

const {verify, verifyAdmin} = require("../auth");
const router = express.Router();

router.post("/addBlogPost", verify, blogPostController.addBlogPost);

router.get("/getAllBlogPost", verify, blogPostController.getAllBlogPost);

router.get("/getBlogPost/:blogPostId", verify, blogPostController.getBlogPost);

router.patch("/updateBlogPost/:blogPostId", verify, blogPostController.updateBlogPost);

router.delete("/deleteBlogPost/:blogPostId", verify, blogPostController.deleteBlogPost);

router.post("/addComment/:blogPostId", verify, blogPostController.addComment);

router.get("/getAllComments/:blogPostId", verify, blogPostController.getAllComments);

router.delete("/deleteComment/:commentId", verify, verifyAdmin, blogPostController.deleteComment);

module.exports = router;