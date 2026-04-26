const sequelize=require("../utils/db-connection");
const {DataTypes}=require("sequelize");

const Slot=sequelize.define("Slot",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    subject:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:true
});

module.exports=Slot;