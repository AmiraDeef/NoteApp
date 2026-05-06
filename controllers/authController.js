const User = require('../models/User')
const { registerschema, loginschema } = require('./validation/authValidation')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { error, value } = registerschema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            })
        }
        const { username, email, password } = value
        const user = await User.findOne({ email })
        console.log(user)
        if (user) {
            return res.status(400).json({
                msg: "user already exist "
            })
        }
        console.error(error)
        const hashPass = await bcrypt.hash(password, 10)
        
        const newUser = await User.create({
            username, email,
            password: hashPass
        })
        return res.status(201).json({
            msg: "welcome", newUser
        })



    } catch (error) {
        return res.status(500).json({
            msg: "server error"
        })
    }
}

const login = async (req, res) => {
    try {
        const { error, value } = loginschema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            })
        }

        const { email, password } = value
        const existUser = await User.findOne({ email })
        console.log(existUser)
        if (!existUser) {
            return res.status(400).json({
                msg: "user not found"
            })
        }
        const comparedPassword = bcrypt.compare(password, existUser.password)
        console.log(comparedPassword)

        if(!comparedPassword){
             return res.status(400).json({
                msg: "password is invalid"
            })
        }
        const token=jwt.sign({
            id:existUser._id,
        },process.env.JWT_SK,{
            expiresIn:"1d"
        })
        return res.status(200).json({
            msg: " login success",token
        })


    } catch (error) {
        return res.status(500).json({
            msg: "server error"
        })
    }
}

const logout = async (req, res) => {
    try {
 return res.status(200).json({
            msg: " logout success",token
        })
    } catch (error) {
        return res.status(500).json({
            msg: "server error"
        })
    }
}

module.exports = {
    register, login, logout
}