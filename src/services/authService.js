const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();

const user=require("../models/user");

const registerUser=async(name,email,password,role)=>{
    const existingUser=await user.findOne({
        where:{ email:email}
    });

    if(existingUser){
        throw new Error("User already exists");
    }
     
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=await user.create({
        name:name,
        email:email,
        password:hashedPassword,
        role:role
    });

    console.log("user created successfully",newUser);
    return newUser;
}

const loginUser=async(email,password)=>{
    const loginUser=await user.findOne({
        where:{email:email}
    });

    if(!loginUser){
        throw new Error("user with this email does not exist");
    }

    const validPassword=await bcrypt.compare(password,loginUser.password);
    if(!validPassword){
        throw new Error("Invalid password");
    }
    
    const token=jwt.sign({userId:loginUser.id},process.env.TOKEN,{expiresIn:"5h"});
    return token;
}

module.exports={
    registerUser,
    loginUser
}