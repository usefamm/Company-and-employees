const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    familyName: {
        type: String,
        required: true,
        trim: true
    },
    Code:{
        type:Number,
        required:true,
        trim:true
    },
    Gender: {
        type: String,
        enum:["Male".toLowerCase(),"Female".toLowerCase()],
        required:true
    },
    Manager: {
      type:Boolean,
      required:true
    },
    birthDay:{
        type:Date,
        required:true
    },
    Company_id:{
        type:Schema.Types.ObjectId,
        ref:"Company",
        required:true
    }
    

});


module.exports = mongoose.model('employee', employeeSchema);
