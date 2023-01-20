import { useState,useEffect } from 'react';
import './App.css';
import Axios from 'axios'

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0)
  const [foodList ,setFoodList]=useState([]);
  const [newFoodName, setNewFoodName]=useState([])

useEffect(()=>{
  Axios.get("http://localhost:3001/read").then((response)=>{
    setFoodList(response.data)
  });
},[])

  const addToList = () => {
    Axios.post('http://localhost:3001/insert', { foodName: foodName, days: days }) //passing object as 2nd parameter to update backend data
  }

  const updateFood=(id)=> {   // put-update
    Axios.put("http://localhost:3001/update",{id :id, newFoodName :newFoodName })
  }

  const deleteFood=(id)=> {  
    console.log("deleting ",id) // put-update
    Axios.put(`http://localhost:3001/delete/${id}`,{id :id, newFoodName :newFoodName })
  }

  return (
    <div className="App">
      <h1>CRUD app with MERN</h1>
      <label>Food Name:</label>
      <input type="text" onChange={(event) => { setFoodName(event.target.value) }}></input>
      <label>Days Since you ate:</label>
      <input type="number" onChange={(event) => { setDays(event.target.value) }}></input>
      <button onClick={addToList}>Add to list</button>

      <h1>Food List</h1>
    {foodList.map((val,key)=>{
      return (
      <div key={key} className="food"><h>{val.foodName}</h><h1>{val.daysSinceIAte}</h1>{""}
      <input type="text" 
      placeholder="New food name..." 
      onChange={(event) => { 
        setNewFoodName(event.target.value) 
        }}/>
    <button onClick={()=>updateFood(val._id)}>Update</button>

    <button onClick={()=>deleteFood(val._id)}>Delete</button>
      </div>
      
      )
      
    })}
    </div>
  )
}

export default App;
