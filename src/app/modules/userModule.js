import { verify } from "crypto";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { type } from "os";
const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : [true, "Please Provide a username"],
        unique : true
    },
    useremail: {
        type : String,
        required : [true, "Please Provide a useremail"],
        unique : true
    }, 
    password: {
        type : String,
        required : [true, "Please Provide a password"],
        
    },
    isVerified: {
        type : Boolean,
        default : false
    },
    isAdmin: {
        type : Boolean,
        default : false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken :String,
    verifyTokenExpiry : Date
    
})
const User = mongoose.models.Users || mongoose.model("users",userSchema)

export default User