const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyBlogs,
} = require("../controllers/postController");

const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/createposts', authMiddleware, createPost);
router.get('/getallposts', getAllPosts);
router.get('/getposts/:id', getPostById);
router.put('/updateposts/:id', authMiddleware, updatePost);
router.delete('/deleteposts/:id', authMiddleware, deletePost);
router.get('/getmyblog',authMiddleware, getMyBlogs)

module.exports = router;
