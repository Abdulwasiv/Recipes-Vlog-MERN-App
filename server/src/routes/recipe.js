import { recipemodel } from "../models/recipe.js";
import  Express  from "express";
import { usermodel } from "../models/user.js";
import { verifyToken } from "./Users.js";

const router = Express.Router();

router.get("/",async (req,res)=>{
    try{
        const response=await recipemodel.find({})
        res.json(response)
    }catch(err){
        res.json(err)
    }
})

router.post("/", async (req,res)=>{
   const recept= new recipemodel(req.body)
    try{
        const response=await recept.save( )
        res.json(response);
    }catch(e){
        res.json(e)
    }
})

router.put("/",async (req,res)=>{
   const receptid=await recipemodel.findById(req.body.receptID)
    const userid=await usermodel.findById(req.body.userID)
    try{
        userid.savedrecept.push(receptid)
        await userid.save()
        res.json({savedrecept: userid.savedrecept})
    }catch(err){
        res.json(err)
    }
})


router.get("/savedrecept/ids:userID", async(req,res)=>{
    try{
        const user= await usermodel.findById(req.params.userID)
        res.json({savedrecept: user?.savedrecept})
    }catch(e){
        res.json(e)
    }

})

router.get("/savedrecept/:userID", async(req,res)=>{
    try{
        const user=await usermodel.findById(req.params.userID)
        const savedrecept=await recipemodel.find({
            _id:{$in: user.savedrecept},
        })
        res.json( {savedrecept} )
    }catch(e){
        res.json(e)
    }
})

export {router as recipesrouter}

