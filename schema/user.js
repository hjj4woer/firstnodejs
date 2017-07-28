var mongoose = require('mongoose');

module.exports = new  mongoose.Schema({
    name:{
        type:String,
        unique: true,
        default: ""
    },

    password:{
        type:String,
        default:""
    }
});