const mongoose=require('mongoose')



const userSchema=mongoose.Schema({
        username:{
            type:String,
            trim:true,
            required:true,
            
        },email:{
            type:String,
            trim:true,
            required:true,
            unique:true
        },
        password:{
             type:String,
            trim:true,
            
        }

},{timestamps:true})


const User=mongoose.model("User",userSchema)
module.exports=User;