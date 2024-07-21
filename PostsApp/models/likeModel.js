const mongoose = require('mongoose');
const Post = require('../models/postModel')

const likeSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    user:{
        type: String,
    }
})
module.exports = mongoose.model("Like",likeSchema);