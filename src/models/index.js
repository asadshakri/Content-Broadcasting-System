const content=require("./content");
const user=require("./user");
const slot=require("./slot");
const schedule=require("./schedule");


user.hasMany(content,{foreignKey:"uploaded_by"});
content.belongsTo(user,{foreignKey:"uploaded_by"});

user.hasMany(content,{foreignKey:"approved_by"});
content.belongsTo(user,{foreignKey:"approved_by"});

slot.hasMany(schedule,{foreignKey:"slot_id"});
schedule.belongsTo(slot,{foreignKey:"slot_id"});

content.hasMany(schedule,{foreignKey:"content_id"});
schedule.belongsTo(content,{foreignKey:"content_id"});


module.exports={
    content,
    user,
    slot,
    schedule
}

