const express=require("express");
const router=express.Router();

const publicController=require("../controllers/publicController");

router.get("/content/live/:teacherId",publicController.liveContent);

module.exports=router;