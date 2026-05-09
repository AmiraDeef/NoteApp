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
    return res.status(500).json('server error')
  }


}
module.exports={
  authMiddleware
}