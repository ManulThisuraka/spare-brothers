const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    usertype : {
        type : String,
        required : true
    },
    riders:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:'riders'
    }

})

const User = mongoose.model("users",userSchema)

module.exports = User