
const authService=require('../services/authService');

const register=async(req,res)=>{
    const {name,email,password,role}=req.body;
    try{
        await authService.registerUser(name,email,password,role);
        res.status(201).json({message:"User registered successfully"});

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const token=await authService.loginUser(email,password);
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