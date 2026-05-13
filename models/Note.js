//call mongoose

const mongoose=require('mongoose')
const categories = ['work', 'personal', 'study', 'urgent',"others"];
//create scema
const noteSchema=new mongoose.Schema({

    title:{
      type:String,
        trim:true,
        required:true,
        unique:true
        
    },description:{ 
        type:String,
        trim:true
    }
    ,isComplete:{
        type:Boolean,
        default:false

    },category:
    {
       type:String,
       required:true,
       enum:categories,
        default:"others",
       trim:true,
       lowercase:true
    }
    ,image:{
        type:String,
   
    }
    ,user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
       required:true,
    }

},{timestamps:true})

//create model
const Note=mongoose.model('Note',noteSchema);

//export model
module.exports=Note;