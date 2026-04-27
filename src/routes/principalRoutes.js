const express=require('express');
const router=express.Router();
const principalController=require("../controllers/principalController");
const authenticate=require("../middleware/authenticate");
const role=require("../middleware/role");

router.get("/uploaded-contents",authenticate,role("principal"),principalController.uplaadedContent);
router.get("/pending-contents",authenticate,role("principal"),principalController.pendingContent);
router.patch("/reject-content/:id",authenticate,role("principal"),principalController.rejectContent);
router.patch("/approve-content/:id",authenticate,role("principal"),principalController.approveContent);

module.exports=router;