const express=require('express');
const cors=require('cors');
const { createTodo, updateTodo } = require('./types.js');
const {todo} =require('./db.js')
const app=express();

app.use(express.json());
app.use(cors());

app.post("/todo",async function(req,res){
    const todobody=req.body;
    const response=createTodo.safeParse(todobody);

    if(!response.success){
        res.status(411).json({
            msg:"Yon sent the Wrong inputs"
        })
        return;
    }

    await todo.create({
        title:todobody.title,
        description:todobody.description,
        completed:false
    })

    res.json({
        title:todobody.title,
        description:todobody.description,
        completed:false
    })
})

app.get("/todos",async function(req,res){
    const todos= await todo.find({})
    res.json({
        todos
    })
})

app.put("/completed",async function(req,res){
    const todobody=req.body;
    const response=updateTodo.safeParse(todobody);

    if(!response.success){
        res.status(411).json({
            msg:"Yon sent the Wrong inputs"
        })
        return;
    }

    await todo.updateOne(
      { _id: todobody.id },
      { $set: { completed: true } }
    );
    res.json({
        msg:"Todo marked as completed"
    })
}) 

app.listen(3000);