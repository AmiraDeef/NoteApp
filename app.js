require('dotenv').config();
const express=require('express');
const   mongoose  = require('mongoose');
const app=express();
app.use(express.json());
const authRoute=require('./routes/authRoute')

//port
const port =process.env.PORT

//bd connection 
async function dbConnection() {
    try{
        await mongoose.connect(process.env.MONGO_DB)
        console.log("DB CONNECTED")

    }catch(error)
    {   console.error(error);

    }
    
};
dbConnection();

app.use('/',authRoute);


//run server
app.listen(port,()=>{
    console.log("server run ...");
    
});
