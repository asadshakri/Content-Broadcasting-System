const express=require("express");
const app=express();


require("dotenv").config();

const port=process.env.PORT;
const mysql2=require("mysql2");
const db=require("./utils/db-connection");

require("./models");



db.sync({force:false}).then(()=>{
    console.log("Database Synced Successfully");
    app.listen(port,()=>{
        console.log("Server is running on port "+port);
    })
}).catch((err)=>{
    console.log("Unable to sync database",err);
}
)











