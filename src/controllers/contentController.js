
const content=require("../models/content");
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
        start_time:req.body.start_time,
        end_time:req.body.end_time

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

module.exports={
    uploadContent,
    myContents
}