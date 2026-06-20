const PostSchema = require("../models/post.js");

const getPost = async (req, res) => {
  try {
    const posts = await PostSchema.find({ userId: req.userId });
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = req.body;

    const newPost = new PostSchema({
      ...post,
      userId: req.userId,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const updatedPost = await PostSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await PostSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Post silindi" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
};
