const Post = require("../models/Post");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Check if title and content are provided
    if (!title || !content) {
      return res.status(400).json({ msg: "Title and content are required" });
    }

    const post = new Post({
      title,
      content,
      author: req.user.id, // Assuming you are using middleware to populate req.user
    });

    await post.save();

    // Send the response only once
    return res.status(201).json(post);
  } catch (err) {
    console.error('Server error:', err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
};


// Read all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name");
    res.json(posts);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Read post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check authorization
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized to update this post" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();

    res.json(post);
  } catch (err) {
    console.error("Error updating post:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.author.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized to delete this post" });
      }
    await post.deleteOne();
    res.json({ msg: "Post removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};




// Route: GET /api/myblogs
exports.getMyBlogs = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id });
    res.json(posts);
  } catch (err) {
    res.status(500).send("Server error");
  }
};


