const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        const uniName = Date.now() + "-" + Math.round(Math.random() * 10000)
        cb(null, uniName + path.extname(file.originalname))
    }
})
const uplaod=multer({storage})
const imgNote=uplaod.single("image")

module.exports=imgNote