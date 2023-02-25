const mongoose = require("mongoose");
var conn = mongoose.Collection;

var DataSchema=new mongoose.Schema({
    buttonName:{
        type:String,
    },
    buttonRadius: {
        type:String,
    },
    textBox: {
        type:String,
    },
},
{ timestamps: true }
);

var Data=mongoose.model('Data',DataSchema);
module.exports=Data;