import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    summary: {
        type: String,
        required: true
    },

    description: String , 

    image: String
},
{
    timestamps:true
})

const Blog = mongoose.model("Blog",blogSchema);

export default Blog;