const mongoose = require("mongoose");

const roomSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
      
    },
    price:{
        type:Number,
        required:true,
    },
    maxPeople:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    roomNumber:[{
        number:Number,
        unavailabledDates:{type:[Date]}
    }],
}
,{
    timestamps:true
})

module.exports=mongoose.model("room",roomSchema)