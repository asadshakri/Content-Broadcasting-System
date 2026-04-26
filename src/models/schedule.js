
const sequelize=require("../utils/db-connection");
const {DataTypes}=require("sequelize");

const Schedule=sequelize.define("Schedule",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
  /*  content_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    slot_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },*/
    rotation_order:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    duration_minutes:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:true
});


module.exports=Schedule;