const jwt =require('jsonwebtoken')
const authMiddleware=(req,res,next)=>{
  try {

    const authHdr=req.headers.authorization
    if(!authHdr)return res.status(401).json({msg:'Token Required'})
    const token=authHdr.split(" ")[1]
  

    const payload=jwt.verify(token,process.env.JWT_SK)
    req.user=payload.id
    next()

    
  } catch (error) {
    if(error.name=="TokenExpiredError") return res.status(401).json({
      msg:"Session expired, please login again"
    })
    next(error)
  }


}
module.exports={
  authMiddleware
}