const express = require('express');
const { createPost, getAllPosts } = require('../controllers/postController');
const {createLike, deleteLike} = require('../controllers/likeController');
const {createComment} = require('../controllers/commentController');
const router = express.Router();


router.post("/posts/create",createPost);
router.post("/likes/like",createLike)
// router.post("/likes/unlike",deleteLike)
router.post("/comments/create",createComment)
router.get("/allPosts",getAllPosts);

module.exports = router;