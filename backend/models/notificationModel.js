const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const NotificationSchema = new Schema({

    product:{
        type:String,
        required:true

    },

    price:{
        type:Number,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    availableQty:{
        type:Number,
        required:true
    },

    minimumQty:{
        type:Number,
        required:true
    },

    selectedfile:{
        type:String,
        default:null


    },

    mesuringUnit:{
        type:String,
        required:true

    },

    status:{
        type:String,
        default:'available'
    },

    addedDate:{
        type: Date,
        default: new Date()
    }


})


const Notifications = mongoose.model("Notifications",NotificationSchema);
module.exports=Notifications;
