const content=require("../models/content");
const slots=require("../models/slot");
const schedule=require("../models/schedule");


const uplaadedContent=async(req,res)=>{
    try{
        const allContents=await content.findAll();
        res.status(200).json(allContents);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

const pendingContent=async(req,res)=>{
    try{
        const pendingContents=await content.findAll({where:{status:"pending"}});
        res.status(200).json(pendingContents);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

const rejectContent=async(req,res)=>{
    try{
        const contentId=req.params.id;
        const contentRejected= await content.update({
            status:"rejected",
            rejection_reason:req.body.reason
        },{
            where:{id:contentId}
        })
        
    
            res.status(200).json({message:"Content rejected successfully",contentRejected:contentRejected});

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

const approveContent=async(req,res)=>{
    try{
        const contentId=req.params.id;
        const contentToApprove= await content.findByPk(contentId);
        
        if(!contentToApprove){
            return res.status(404).json({message:"Content not found"});
        }

        await contentToApprove.update({
            status:"approved",
            approved_by: req.user.id,
            approved_at: new Date()
        })
        
       
    
            res.status(200).json({message:"Content approved successfully",contentApproved:contentToApprove});

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

module.exports={
    uplaadedContent,
    pendingContent,
    rejectContent,
    approveContent
}
