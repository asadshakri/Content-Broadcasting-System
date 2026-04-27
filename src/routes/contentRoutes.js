const express=require("express");
const router=express.Router();

const contentController=require("../controllers/contentController");
const role=require("../middleware/role");
const upload=require("../middleware/upload");
const auth=require("../middleware/authenticate");


router.post("/upload",auth,role("teacher"),upload.single("file"),contentController.uploadContent);
router.get("/my-contents",auth,role("teacher"),contentController.myContents);
router.get("/approved-contents",auth,role("teacher"),contentController.approvedContent);
router.post("/schedule-content/:id",auth,role("teacher"),contentController.scheduleContent);


module.exports=router;