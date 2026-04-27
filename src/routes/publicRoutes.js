const express=require("express");
const router=express.Router();

const publicController=require("../controllers/publicController");
const publicLimiter=require("../middleware/rate-limiter");


router.get("/content/live/:teacherId",publicLimiter,publicController.liveContent);

module.exports=router;