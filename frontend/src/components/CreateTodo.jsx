import { useState } from "react";

function CreateTodo({ onTodoAdded, example, setExample }){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");

    async function createatodo(){
        if (!title || !description) {
          alert("Please enter title and description");
          return;
        }
        try{
            const response=await fetch("http://localhost:3000/todo",{
                method:"POST",
                body: JSON.stringify({
                    title:title,
                    description:description
                }),
                headers:{
                    "Content-Type": "application/json"
                }
            })
            const newTodo = await response.json();
            console.log(newTodo);
            alert("Todo Added");
            setTitle("");
            setDescription("");
            setExample([...example, 1]);
            // if (onTodoAdded) onTodoAdded(newTodo);   
        }catch(err){
            console.log(err);
        }
    }
    return <div id="createbox">
        <input className="inp" type="text" placeholder="title" value={title} onChange={(e)=>{
            setTitle(e.target.value)
        }} /> <br/>

        <input className="inp" type="text" placeholder="description" value={description} onChange={(e)=>{
            setDescription(e.target.value)
        }} /> <br />

        <button onClick={createatodo}>Add a Todo</button>
    </div>

}

export default CreateTodo