const {Sequelize}=require("sequelize");
require("dotenv").config();

const sequelize=new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host:process.env.RDS_ENDPOINT,
    dialect:process.env.DB_DIALECT,
    logging:false
});

(async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Database Connected Successfully");
    }
    catch(err){
        console.log("Unable to connect to the database",err);
    }
})();

module.exports=sequelize;