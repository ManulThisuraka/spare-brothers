const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({

    productID : {
            type:mongoose.Schema.Types.ObjectId,
            ref:'product',
            required:false
    } ,
    name : {
        type : String
    },
    price : {
        type : Number
    },
    category : {
        type : String
    },
    status : {
        type : String
    },
    image : {
        type : String
    },
    measuringUnit : {
        type : String
    },
    availableQuantity : {
        type : Number
    },
    minimumQuantity : {
        type : Number
    },
    productCount :{
        type: Number
    }
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;