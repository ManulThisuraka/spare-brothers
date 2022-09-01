const mongoose = require('mongoose')

const riderSchema = new mongoose.Schema({

    riderName : {
        type: String,
        required:true
    },
    email : {
        type: String,
        required:true
    },
    riderNic:{
        type:String,
        required:true
    },
    riderPhone:{
        type:String,
        required:true
    },
    vehicleType:{
        type:String,
        required:true
    },
    vehicleNumber:{
        type:String,
        required:true
    },

})

const RiderModel = mongoose.model('riders' , riderSchema);
module.exports=RiderModel;