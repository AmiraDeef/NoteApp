const joi =require('joi')
const noteSchema=joi.object({
    title:joi.string().min(6).required(),
    description:joi.string(),
    image:joi.string().optional()
})
module.exports={
    noteSchema
}