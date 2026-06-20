const express = require("express");
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/post.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.get("/getPosts", getPost);
router.post("/createPost", createPost);
router.patch("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);

module.exports = router;
