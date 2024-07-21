const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const { default: mongoose } = require('mongoose');


exports.createComment = async(req,res)=>{
    try {
        const {post, user, body} = req.body;
        const comment = new Comment({post,user,body});
        const savedComment = await comment.save();

        const updatedPost = await Post.findByIdAndUpdate(post,{$push: {comments:savedComment._id}},{new:true})
        .populate("comments").exec();

        res.status(200).json(
            {
                success : true,
                post : updatedPost
            }
        )

    } catch (err) {
        console.log("Error in creating a comment");
        console.error(err);
    }
}