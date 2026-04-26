const sequelize=require("../utils/db-connection");
const {DataTypes}=require("sequelize");

const Content=sequelize.define("Content",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
    },
    subject:{
        type:DataTypes.STRING,
        allowNull:false
    },
    file_path:{
        type:DataTypes.STRING,
        allowNull:false
    },
    file_type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    file_size:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
  /*  uploaded_by:{
        type:DataTypes.STRING,
        allowNull:false
    },*/
    status:{
        type:DataTypes.ENUM("pending","approved","rejected"),
        defaultValue:"pending"
    },
    rejection_reason:{
        type:DataTypes.TEXT,
        allowNull:true
    },
 /*   approved_by:{
        type:DataTypes.STRING,
        allowNull:true
    },*/
    approved_at:{
        type:DataTypes.DATE,
        allowNull:true
    },
    start_time:{
        type:DataTypes.DATE,
        allowNull:true
    },
    end_time:{
        type:DataTypes.DATE,
        allowNull:true
    }

},{
    timestamps:true
});

module.exports=Content;