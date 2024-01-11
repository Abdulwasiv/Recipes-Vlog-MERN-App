import mongoose from "mongoose"

const recipeschema= new mongoose.Schema({
name:{type:String, require:true},
ingredient:[{type:String , require:true}],
imageUrl:{type:String, require:true},
cookietime:{type:Number, require:true},
UserOwner:{type:mongoose.Schema.ObjectId,
ref:"users",
require:true
}
})

export const recipemodel =mongoose.model("recipe",recipeschema)
