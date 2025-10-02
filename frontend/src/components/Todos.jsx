export function Todos({todos,onTodoCompleted }){
    async function updateatodo(todo){
        try{
            const response=await fetch("http://localhost:3000/completed",{
                method:"PUT",
                body: JSON.stringify({
                    id:todo._id
                }),
                headers:{
                    "Content-Type": "application/json"
                }        
            })  
            if (onTodoCompleted) onTodoCompleted(todo._id); // Call the callback to remove the todo from UI
        }catch(err){
            console.log("Some error");
        }

    }
    return <div id="todos-container">
        {
            todos.map((todo,index)=>{
                return <div id="addedbox">
                    <h1 id="firsth">{todo.title} </h1>
                    <h2 id="secondh">{todo.description} </h2>
                    <button onClick={()=>{
                        updateatodo(todo)
                    }}>{todo.completed?"Completed":"Mark as Complete"}</button>
                </div>
            })
        }
    </div> 
}