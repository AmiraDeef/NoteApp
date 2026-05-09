const errorMiddle=(err,req,res,next)=>{
    console.error(err);
  return res.status(500).json({
          msg: "server error"
        })
    
}

module.exports=errorMiddle