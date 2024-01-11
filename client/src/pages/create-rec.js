import axios from "axios";
import { useState } from "react";
import { userGetId } from "../hooks/userid";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export const Create =()=>{

const navigate=useNavigate();

const [cookies, _] = useCookies(["access_token"]);
const userids= userGetId
const [recipe, setRecipe]=useState({
    name:"",
    ingredient:[],
    imageUrl:"",
    cookietime:0,
    UserOwner:userids
})

const handleChange = (event)=> {
const {name,value}= event.target
setRecipe({...recipe,[name]:value})
}

const handleIngredientChange = (event ,index)=>{
const {value}=event.target
const ingredient=[...recipe.ingredient]
ingredient[index]=value;
setRecipe({...recipe,ingredient})
}


const handleAddIngredient=()=>{
    const ingredient=[...recipe.ingredient,""]
    setRecipe({...recipe,ingredient})
}



const onSubmit=async (event)=>{
event.preventDefault();
try{
await axios.post("http://localhost:3001/recipe",{...recipe}, {
    headers: { authorization: cookies.access_token },
  })
alert("created successfully")
navigate("/")
}catch(e)
{
    console.error(e)
}
}

    return <div className="create-recipe">
        <h2>Create Recipe</h2>
        <form onSubmit={onSubmit}>
        <label htmlfor="name">Name</label>
            <input type="text" id="name" name="name" value={recipe.name} onChange={handleChange}/>
            <label htmlFor="ingredient">Ingredient</label>
       
        {recipe.ingredient.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredient"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
            <label htmlfor="imageUrl">imageUrl</label>
            <input type="text" id="imageUrl" name="imageUrl" value={recipe.imageUrl} onChange={handleChange}/>
            <label htmlfor="cookietime">cookietime</label>
            <input type="text" id="cookietime" name="cookietime" value={recipe.cookietime} onChange={handleChange}/>
            
            <button type="submit">Create new Ingredient</button>
        </form>
    </div>
}

