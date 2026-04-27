const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();

const user=require("../models/user");

const register=async(req,res)=>{
    const {name,email,password,role}=req.body;
    try{
        const existingUser=await user.findOne({
            where:{ email:email}
        });

        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
         
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await user.create({
            name:name,
            email:email,
            password:hashedPassword,
            role:role
        });

        console.log("user created successfully",newUser);
        res.status(201).json({message:"User registered successfully"});

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const loginUser=await user.findOne({
            where:{email:email}
        });

        if(!loginUser){
            return res.status(400).json({message:"user with this email does not exist"});
        }

        const validPassword=await bcrypt.compare(password,loginUser.password);
        if(!validPassword){
            return res.status(400).json({message:"Invalid password"});
        }
        
        const token=jwt.sign({userId:loginUser.id},process.env.TOKEN,{expiresIn:"5h"});
        res.status(200).json({token:token,message:"Login successful"});

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


module.exports={
    register,
    login
}