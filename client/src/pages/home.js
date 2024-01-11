import { useState,useEffect } from "react"
import axios from "axios";
import  {userGetId } from "../hooks/userid";

export const Home =()=>{  
    const userID = userGetId();
    const [recipe,setrecipe]=useState([]);
   const [savedrecipe,setsavedrecipe]=useState([])
    useEffect(()=>{
        const fetchrecipe= async()=>{
            try{
                const res= await axios.get("http://localhost:3001/recipe")
                setrecipe(res.data)
            }catch(e)
            {console.error(e)}
        }
        const fetchsavedrecipe= async()=>{
            try{
                const res= await axios.get(`http://localhost:3001/recipe/savedrecept/ids/${userID}`)
                setsavedrecipe(res.data.savedrecept)
                console.log(res.data)
            }catch(e)
            {console.error(e)}
        }
    fetchrecipe()
    fetchsavedrecipe()
 },[])

 const savedrecept= async (receptID) =>{
    try{
        const response=await axios.put("http://localhost:3001/recipe",
        {receptID,
         userID,
        })
    setsavedrecipe(response.data.savedrecept)
    }catch(e){
        console.error(e)
    }
 }
   
   const isSaved=(id)=>savedrecipe.includes(id) 
  // const isRecipeSaved = (id) => savedRecipes.includes(id);
   return <div>
        <h1>Recipes</h1>
        <ul>{recipe.map((recipes)=>(
            <li key={recipes._id}>
               
<div>
<h2>{recipes.name}</h2>


</div>
                <div className="instructions">
                <p>Ingredient: {recipes.ingredient}</p>
                </div>
                <img src={recipes.imageUrl} alt={recipes.name} />
                <p>Cooking time {recipes.cookietime} </p>
                <button onClick={ () => savedrecept(recipes._id)  } 

disabled={isSaved(recipes._id) } 
> 
{isSaved(recipes._id)?"Saved":"Save"}
</button>
            </li>
        ))}</ul>
        </div>
}

