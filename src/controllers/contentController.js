
const content=require("../models/content");
const slots=require("../models/slot");
const schedule=require("../models/schedule");
const s3=require("../utils/s3");
require("dotenv").config();


const uploadContent=async(req,res)=>{
    const file = req.file;
    try{
    const key = `content/${Date.now()}-${file.originalname}`;

    const upload = await s3.upload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read"
    }).promise();

    const contentDetails=await content.create({
        title:req.body.title,
        description:req.body.description,
        subject:req.body.subject,
        file_path:upload.Location,
        file_type:req.file.mimetype,
        file_size:req.file.size,
        uploaded_by:req.user.id,
        start_time:new Date(req.body.start_time),
        end_time: new Date(req.body.end_time)

    });

    res.status(201).json({message:"Content uploaded successfully",contentDetails:contentDetails});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

const myContents=async(req,res)=>{
    try{
        const contents=await content.findAll({
            where:{uploaded_by:req.user.id}
        });
        res.status(200).json({contents:contents});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


const approvedContent=async(req,res)=>{
    try{
        const contents=await content.findAll({
            where:{
                uploaded_by:req.user.id,
                status:"approved"
            }
        });
        res.status(200).json({contents:contents});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


const scheduleContent=async(req,res)=>{
try{
    const appContent = await content.findOne({
        where: {
          id: req.params.id,
          uploaded_by: req.user.id,
          status: "approved"
        }
      });

      if (!appContent) {
        return res.status(404).json({
          message: "Approved content not found"
        });
    }

    const [slot]= await slots.findOrCreate({
        where:{
            subject:appContent.subject,
        }
    })

    const existingSchedule= await schedule.findOne({
        where:{
            content_id:appContent.id,
        }
    });

    if(existingSchedule){
        return res.status(400).json({message:"Content is already scheduled"});
    }


        const max = await schedule.max("rotation_order", {
          where: { slot_id: slot.id }
        });
    
        const newSchedule=await schedule.create({
          content_id: appContent.id,
          slot_id: slot.id,
          rotation_order: (max || 0) + 1,
          duration_minutes: req.body.duration
        });


        res.status(200).json({message:"Content scheduled successfully",scheduleDetails:newSchedule});
}
catch(err){
    res.status(500).json({message:err.message});
}
}

module.exports={
    uploadContent,
    myContents,
    scheduleContent,
    approvedContent
}