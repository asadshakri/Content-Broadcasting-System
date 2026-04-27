const slots=require("../models/slot");
const schedule=require("../models/schedule");
const content=require("../models/content");
const {Op}=require("sequelize");


const liveContent=async(req,res)=>{

    const subject=req.query.subject;
    const teacherId=req.params.teacherId;
   
    try{

    const slot=await slots.findOne({
        where:{
            subject:subject
        }
    })

    if(!slot){
        return res.status(200).json({message:"Invalid subject",response:[]});
    }

    const currentTime=new Date();

    const liveSchedule=await schedule.findAll({
        where:{
            slot_id:slot.id,
        },
        include:[
            {
                model:content,
                where:{
                    uploaded_by:teacherId,
                    status:"approved",
                    start_time:{[Op.lte]:currentTime},
                    end_time:{[Op.gte]:currentTime}
                }
            }
        ],
        order:[["rotation_order","ASC"]]
    })
    console.log("live schedule",liveSchedule);

    if(liveSchedule.length===0){
        return res.status(200).json({message:"No live content available",response:[]});
    }

    const sumDuration=liveSchedule.reduce((sum,l)=>{
        return sum + l.duration_minutes;
    }
    ,0);

    const minute = Math.floor(Date.now() / 60000) % sumDuration;

    let running = 0;

    for (const row of liveSchedule) {
    running += row.duration_minutes;

    if(minute < running){
        return res.status(200).json({message:"Live content found",response:row.Content});
    }
    }
    res.status(200).json(liveSchedule[0].Content);
}
catch(err){
    res.status(500).json({message:err.message});
}
}


module.exports={
    liveContent
}
