const express = require('express');
const router = express.Router();


const {signup, login} = require('../controllers/Auth');
const {auth, isStudent, isAdmin, getUser} = require('../middlewares/auth');

router.post("/signup", signup);
router.post("/login", login);

// protected routes
router.get("/test", auth, (req,res)=>{
    res.json({
        success : true,
        message:"Welcome to protected route for Testing purpose!"
    })
})




router.get("/student",auth,isStudent, (req,res)=>{
    res.json({
        success:true,
        message:"Welcome to protected route for students!"
    })
})

router.get("/admin",auth,isAdmin, (req,res)=>{
    res.json({
        success:true,
        message:"Welcome to protected route for Admin!"
    })
})


router.get("/getUser",auth,getUser);

module.exports = router;