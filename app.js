require('dotenv').config();
const express=require('express');
const   mongoose  = require('mongoose');
const app=express();
app.use(express.json());
const authRoute=require('./routes/authRoute')
const noteRoutes=require('./routes/noteRoute')
//port
const port =process.env.PORT
const path = require('path');
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
app.use('/',noteRoutes)
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
const errorMiddle=require('./middleware/errorHandellerMiddleware')
app.use(errorMiddle)
//run server
app.listen(port,()=>{
    console.log("server run ...");
    
});
