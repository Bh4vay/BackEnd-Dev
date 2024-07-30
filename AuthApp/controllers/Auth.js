const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// signup handler
exports.signup = async(req, res) =>{
    try {
        const {name, email, password, role} = req.body;
        
        // if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message:"User already exists!"
            })
        }

        // secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }catch(err){
            return res.status(500).json({
                success: false,
                message:"Password not hashed"
            })
        }

        // create user in db
        const user = await User.create({name, email, password:hashedPassword, role});
        res.status(200).json({
            success: true,
            message: "User created Successfully!"
        })

    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            sucess:false,
            message:"User cannot be registered!"
        })
    }
}


exports.login = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Enter the details carefully!"
            })
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Kindly register first!"
            })
        }

        const payload = {
            email : user.email,
            id : user._id,
            role : user.role
        }

       //if user email there, then verify password
        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{"expiresIn" : "3h"});

            user = user.toObject();
            user.token = token;
            user.password = undefined;
            // console.log(user);

            const options = {
                expires : new Date(Date.now() + 30000),
                httpOnly :true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully!"
            });
            // res.status(200).json({
            //     success:true,
            //     token,
            //     user,
            //     message:"User logged in successfully!"
            // });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password is not correct!"
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Log in unsuccessful!"
        })
    }
}