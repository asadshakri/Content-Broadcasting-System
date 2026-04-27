const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req,file,cb)=>{
    const allowedTypes=["image/jpeg","image/png","image/gif"].includes(file.mimetype);
    if(allowedTypes){
        cb(null,true);
    }
    else{
        cb(new Error("Only image files are allowed"),false);
    }
  }
});

module.exports = upload;