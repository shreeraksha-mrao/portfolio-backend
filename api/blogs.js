import express from 'express';
import { upload } from '../middlewares/multer.js'; 
import uploadOnCloudinary from '../utils/cloudinary.js'; 
import Blog from '../models/blogs.models.js';

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.post('/blogs', upload.single("image"), async (req, res) => {
    const { title, summary, description } = req.body;
    const imagePath = req.file?.path;

    if (!imagePath) {
        return res.status(401).json({ message: "Image is missing", data: "" });
    }

    const cloudResponse = await uploadOnCloudinary(imagePath);
    if (!title || !summary || !description) {
        return res.status(401).json({ message: "Please fill all data", data: [] });
    }

    const blog = await Blog.create({
        title, summary, description, image: cloudResponse.url
    });

    return res.status(200).json({ message: "Blog created successfully", data: blog });
});

app.get('/blogs', async (req, res) => {
    const allblogs = await Blog.find({});
    return res.status(200).json({ message: "All blogs retrieved successfully", data: allblogs });
});

app.get('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    const detail = await Blog.findById(id);
    if (!detail) {
        return res.status(404).json({ message: "Blog not found", data: {} });
    }
    return res.status(200).json({ message: "Blog found successfully", data: detail });
});

app.delete('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    const ans = await Blog.findByIdAndDelete(id);
    return res.status(200).json({ message: "Successfully deleted", data: ans });
});

// Export the app as Vercel serverless function
export default async function (req, res) {
  app(req, res);
}
