import mongoose from 'mongoose'

const UserScheme =new mongoose.Schema({
    username:{ type:String , required:true, unique:true },
    password :{type:String , required:true},
    savedrecept:[{ type: mongoose.Schema.Types.ObjectId, ref:"recipe" , 
    require:true }]
})

 export const usermodel = mongoose.model("users",UserScheme)
