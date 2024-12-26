import mongoose from "mongoose"

const connectDB = async ()=>{
    try{
        const connection = await mongoose.connect('mongodb+srv://raksha330:qwerty330@raksha-portfolio.ejpwt.mongodb.net/?retryWrites=true&w=majority&appName=raksha-portfolio');
        console.log("Database connected successfully on host " + connection.connection.host);
    }
    catch(e){
        console.log("Error while connecting to the database hahaha");
        console.log(e);
        process.exit(0);
    }
}

export default connectDB;