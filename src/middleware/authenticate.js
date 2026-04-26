const jwt=require("jsonwebtoken");
require("dotenv").config();
const user=require("../models/user");


const authenticate= async(req,res,next)=>{
    const token=req.headers("Authorization");
    if(!token){
        res.status(401).json({message:"token not provided"});
    }
    try{
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        const loginUser= await user.findByPk(decodedToken.userId);
        if(!loginUser){
            res.status(401).json({message:"Invalid token"});
        }
        req.user=loginUser;
        next();
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

module.exports=authenticate;