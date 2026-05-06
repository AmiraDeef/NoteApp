const joi =require('joi')
// const user=require('../../models/User')


const registerschema=joi.object({

    username:joi.string().required().max(20).min(3),
    email:joi.string().required().email(),
    password:joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))


})


const loginschema=joi.object({
    email:joi.string().required(),
    password:joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

})


module.exports={registerschema,loginschema}