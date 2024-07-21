const Post = require('../models/postModel');
const Like = require('../models/likeModel');
const { default: mongoose } = require('mongoose');


exports.createLike = async(req,res)=>{
    try {
        const {post, user} = req.body;
        const like = new Like({post,user});
        const savedLike = await like.save();

        const updatedPost = await Post.findByIdAndUpdate(post,{$push: {likes:savedLike._id}})
        .populate("likes").exec();

        res.status(200).json(
            {
                success : true,
                post : updatedPost
            }
        )

    } catch (err) {
        console.log("Error in doing a like");
        console.error(err);
    }
}

// exports.deleteLike = async(req,res)=>{
//     try {
//         const {post, user} = req.body;
//         const deletedLike = await Like.findOneAndDelete({post:post,_id:user});

//         const updatedPost = await Post.findByIdAndDelete(post,{$pull: {likes:deletedLike._id}},{new:true})
//         .populate("likes").exec();

//         res.status(200).json(
//             {
//                 success : true,
//                 post : updatedPost
//             }
//         )

//     } catch (err) {
//         console.log("Error in undoing a like");
//         console.error(err);
//     }
// }