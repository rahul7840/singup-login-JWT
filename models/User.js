import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({

    name:{type:'String',require:'true',trim:true},
    email:{type:'String',require:'true',trim:true},
    password:{type:'String',require:'true',trim:true},
 
})
//model
const UserModel=mongoose.model('user', UserSchema)

export default UserModel