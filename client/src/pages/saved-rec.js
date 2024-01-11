import { useState,useEffect } from "react"
import axios from "axios";
import  {userGetId } from "../hooks/userid";


export const Saved =()=>{  
    const userID = userGetId();
    const [savedrecept,setsavedrecept]=useState([]);
    useEffect(()=>{
        const fetchrecipe= async()=>{
            try{
                const response= await axios.get(`http://localhost:3001/recipe/savedrecept/${userID}`)
                setsavedrecept(response.data.savedrecept)
            }catch(e)
            {console.error(e)}
        }
      
    fetchrecipe()
 },[])


  // const isRecipeSaved = (id) => savedRecipes.includes(id);
   return <div>        
        <h1>Recipes</h1>
        <ul>
            {savedrecept.map ((recipes)=>(
            <li key={recipes._id}>
               
<div>
<h2>{recipes.name}</h2>
</div>
                <div className="instructions">
                <p>{recipes.ingredient}</p>
                </div>
                <img src={recipes.imageUrl} alt={recipes.name} />
                <p>Cooking time {recipes.cookietime} </p>
               
            </li>
        ))}</ul>
        </div>
}

