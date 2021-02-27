
import './App.css';
import './key';
import Axios from "axios";
import {useState} from "react"; 
import RecipeTile from './RecipeTile';



function App() {

  const[query,setQuery]=useState("");
  const [recipes,setRecipes]=useState([]);
  const [health,setHealth]=useState("vegan");

  var url =`https://api.edamam.com/search?q=${query}&app_id=73134ef2&app_key=929d2d5d52de9f63427663ee43f4b7eb&health=${health}`;

  async function getRecipes(){
    var result = await Axios.get(url);
    setRecipes(result.data.hits);
    // console.log(result.data);
  }

  const onSubmit=(e)=>{
    e.preventDefault();
    getRecipes();
  }


  return (
    <div className="app">
    <h1>Harshit Kitchen</h1>
    <form className="search" onSubmit={onSubmit}>
    <input type="text"  className="app_input" placeholder="Enter your food name"
    value={query} onChange={(e)=>setQuery(e.target.value)}/>
    <input className="app_sumbit" type="submit" value="Search" />
    <select className="select">
    <option onClick={()=>setHealth("vegan")}>Vegan</option>
    <option onClick={()=>setHealth("vegetarian")}>vegetarian</option>
    <option onClick={()=>setHealth("paleo")}>paleo</option>
    <option onClick={()=>setHealth("diary-free")}>diary-free</option>
    <option onClick={()=>setHealth("gluten-free")}>gluten-free</option>
    <option onClick={()=>setHealth("wheat-free")}>wheat-free</option>
    </select>
    </form>
    <div className="app_recipe">
    {recipes.map((recipe)=>{
     return <RecipeTile recipe={recipe}/>;
    })}
    </div>
    </div>

  );
}

export default App;
