import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
const app=express()
import  {Userrouter} from "./routes/Users.js"
import { recipesrouter } from './routes/recipe.js'

app.use(express.json())
app.use(cors())

app.use("/auth",Userrouter)
app.use("/recipe",recipesrouter)

app.use(express.urlencoded({
    extended: true
  }))

mongoose.connect("mongodb+srv://abdwasiv02:abd123@recept.eeikgrv.mongodb.net/?retryWrites=true&w=majority")

app.listen(3001,()=> console.log('server start') ) 