import mongoose from "mongoose";

const delieverSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true 
    },
    phoneNumber : {
        type : String,
        required : true
    },
    area : {
        type : String,
        required : true
    },
    landMark : {
        type : String,
        required : true
    },
    apartment : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    }
})


export default mongoose.model("delieveryInfo", delieverSchema);
