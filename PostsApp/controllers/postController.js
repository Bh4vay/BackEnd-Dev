const Post = require('../models/postModel');

exports.createPost = async(req,res)=>{
    try {
        const {title, body, comments, likes} = req.body;
        const post = new Post({title,body});
        const savedPost = await post.save();

        res.status(200).json(
            {
                success : true,
                data : savedPost
            }
        )
    } catch (err) {
        console.log("Error in creating a post");
        console.error(err);
    }
}

exports.getAllPosts = async(req,res) =>{
    try {
        const posts = await Post.find().populate("comments");
        res.json({
            posts
        })
    } catch (err) {
        console.log("Error");
    }
}