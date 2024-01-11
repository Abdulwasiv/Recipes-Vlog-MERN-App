//import { Form } from "react-router-dom"
import { useState } from "react"
import { useCookies } from "react-cookie"
import axios from "axios"
import { useNavigate } from "react-router-dom" 

export const Authen =()=>{
    return <div className="auth">
        <Login/>
        <Register/>
    </div>
}

const Login=()=>{
    const [_,setCookies]=useCookies(["access_token"])
    const [username,setusername]= useState("");
    const[password,setpassword]= useState("")
    const navigate = useNavigate();

     const onSubmt= async (event)=>{
        event.preventDefault();
        try{
        const result = await axios.post("http://localhost:3001/auth/login", {username,password})
       setCookies("access_token", result.data.token);
       window.localStorage.setItem("userID", result.data.userID);
       navigate("/");
        }
        catch(err){
            console.error(err)
        }
     }

    return <Form username={username} password={password} setusername={setusername} setpassword={setpassword} 
 onSubmit={onSubmt} 
    label="Login"/>
}

// const Login = () => {
//     const [_, setCookies] = useCookies(["access_token"]);
  
//     const [username, setusername] = useState("");
//     const [password, setpassword] = useState("");
  
//     const navigate = useNavigate();
  
//     const handleSubmit = async (event) => {
//       event.preventDefault();
  
//       try {
//         const result = await axios.post("http://localhost:3001/auth/login", {
//           username,
//           password,
//         });
  
//         setCookies("access_token", result.data.token);
//         window.localStorage.setItem("userID", result.data.userID);
//         navigate("/");
//       } catch (error) {
//         console.error(error);
//       }
//     }
 
//     return <Form username={username} password={password} setusername={setusername} setpassword={setpassword} 
//  onSubmit={handleSubmit}  label="Login"/>
// }




const Register=()=>{
   const [username,setusername]= useState();
   const[password,setpassword]= useState()

   const onSubmit = async (event)=>{
    event.preventDefault()
    try{
        axios.post("http://localhost:3001/auth/register", {username,password})
        alert("Register completed Successfully")
    }
    catch(err)
    {
        console.error(err)
    }
   }

   return <Form username={username} password={password} setusername={setusername} setpassword={setpassword} onSubmit={onSubmit} label="Register"/>
}

const Form = ({username,setusername,password,setpassword,label,onSubmit})=>{
return(
    <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" onChange={(event)=>setusername( event.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">password:</label>
                    <input type="password" id="password" onChange={(event)=>setpassword(event.target.value)}></input>
                </div>
                <button type="submit">{label}</button>
            </form>
    </div>
)
}