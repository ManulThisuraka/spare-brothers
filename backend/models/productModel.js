const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    
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
    }

})


const products = mongoose.model("product",productSchema);
module.exports=products;
