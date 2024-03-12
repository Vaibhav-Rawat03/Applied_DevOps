import mongoose from 'mongoose'

const newuser=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const register =new mongoose.model('signup', newuser,'signup')

export default register