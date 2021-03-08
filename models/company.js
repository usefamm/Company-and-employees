const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
       
    },
    submitNumber: {
        type: Number,
        required:true
     
    },
    Town: {
        type: String,
        required:true
    },
    City: {
        type:String
    },
    SubmitDate:{
        type: Date,
        default:Date.now

    },
    Phone:{
        type:Number

    }
    
    

});

module.exports = mongoose.model('Company', CompanySchema);

