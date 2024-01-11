import  express from "express";
import  {usermodel} from "../models/user.js"
import bycrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const  router =express.Router()
const app =express()


router.post("/register",async (req,res) => {
    const {username,password} =req.body
   const user=await usermodel.findOne({username})

  if(user)
  {
    return  res.json({message:"User already Exists"})
  }
  //var salt = bycrypt.genSaltSync(10);
 // var hash = bycrypt.hashSync("B4c0//", salt);
 const hash= await bycrypt.hash(password,10) 
  const newuser= new usermodel({username, password:hash})
  await newuser.save()

  res.json({message:"user created successfully"})
    
} )


app.use(express.urlencoded({
  extended: true
}))


router.post("/login",async (req,res)=>{
  const {username,password}= req.body
  const user=await usermodel.findOne({username})
  if(!user)
  {
   return res.json ({ message:"user does not exits "})
  }
  const ispas=await bycrypt.compare(password,user.password)
  if(!ispas)
  {
    return res.json({message:"Pass word does not match"})
  }
  const token = jwt.sign({id: user._id} , "secret")
  res.json({ token , userID : user._id })

})

export {router as Userrouter}

export const verifyToken = (req,res,next)=>{
  const token =req.headers.authorization
  if(token)
  {
      jwt.verify(token,"secret",(err)=>{
        if(err) return res.sendStatus(403)  
        next()
      })
  }
  else{
    res.sendStatus(401)
  }
  }
