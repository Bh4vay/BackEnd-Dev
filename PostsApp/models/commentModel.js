const mongoose = require('mongoose');
const Post = require('../models/postModel')

const commentSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    user:{
        type: String,
    },
    body:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Comment",commentSchema);