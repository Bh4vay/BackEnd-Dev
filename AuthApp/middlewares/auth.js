const jwt = require('jsonwebtoken');
// const User = require('../models/user');
require("dotenv").config();

exports.auth = (req,res,next)=>{
    try {
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing!"
            })
        }
            // verify token
            try {
                const payload = jwt.verify(token,process.env.JWT_SECRET_KEY);
                console.log(payload);
                req.body = payload;

            } catch (err) {
                 return res.status(401).json({
                success:false,
                message:"Token invalid!"
                })
            }
            next();
        }
    catch (err) {
        return res.status(400).json({
            success:false,
            message:"Something went wrong!"
        })
    }
}


exports.isStudent = (req,res,next)=>{
    try {
        if(req.body.role!== "Student"){
            return res.status(500).json({
                success:false,
                message:"This is protected route for students only"
            })
        }
        next();
    } catch (err) {
        return res.status(500).json({
                success:false,
                message:"Role not matching"
            })
    }
}

exports.isAdmin = (req,res,next)=>{
    try {
        if(req.body.role!== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for admin only"
            })
        }
        next();
    } catch (err) {
        return res.status(500).json({
                success:false,
                message:"Role not matching"
            })
    }
}

// exports.getUser = async (req,res,next)=>{
//     try {
//         const token= req.body.token;
//         const email= token.email;
//         const user = await User.findOne({email});
//         console.log(user);
//         res.json({
//             success:true,
//             data : user
//         })
//     } catch (err) {
//         res.status(500).json({
//             success:false,
//             message:"User not found"
//         })
        
//     }
// }