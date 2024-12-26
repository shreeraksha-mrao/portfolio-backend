import express from "express"  // module
import mongoose from "mongoose";
import connectDB from "./db/config.js";
import Blog from "./models/blogs.models.js";
import cors from "cors";
import { upload } from "./middlewares/multer.js";
import uploadOnCloudinary from "./utils/cloudinary.js";
// const express = require('express') // common js


const app = express();



app.use(express.json()); // middleware for express to understand json

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials:true
    }
)); // npm i cors, used for cross origin resource sharing

connectDB();
app.get('/', async(req,res) => {
    res.send("I'm alive");
})
app.post('/blogs',upload.single("image"),async (req,res)=>{
    console.log("aayo")
    const {title,summary,description} = req.body;
    
    const imagePath = req.file?.path;

    if(!imagePath){
        return res.status(401).json({message:"Image nahi hai",data:"" });
    }

    const cloudResponse = await uploadOnCloudinary(imagePath);
    

    console.log(imagePath);
    if(!title || !summary || !description){
        return res.status(401).json({message: "Fill all data",data: []});
    }

    const blog = await Blog.create({title,summary,description,image:cloudResponse.url});

    return res.status(200).json({message: "Blog created successfully",data:blog});
})

app.get('/blogs',async (req,res)=>{
    const allblogs = await Blog.find({});

    return res.status(200).json({message:"All blogs retrieved successfully",data:allblogs});
})




app.get('/blogs/:id',async (req,res)=>{
    const {id} = req.params;
    const detail = await Blog.findById(id);
    if(!detail){
        return res.status(404).json({message: "blog not found", data:{}});
    }
    return res.status(200).json({message: "blog found successfully",data:detail });

})

app.delete('/blogs/:id', async (req,res)=>{
    const {id} = req.params;
    const ans = await Blog.findByIdAndDelete(id);
    return res.status(200).json({message: "sucessfully deleted", data:ans})
})



app.listen(3000,()=>{
    console.log("Server running at port 3000");
})