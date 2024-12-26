import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name: "dkz4s1ngg",
    api_key: "369289311285375",
    api_secret: "ea7I-KwMSnMM7LKKGVO-87fHxnU",
  });


  const uploadOnCloudinary = async (localFilePath) => {
    try {
      if (!localFilePath) return null;
  
      // upload file on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
        folder: "Blogs",
      });
  
      // file has been uploaded successfully
      console.log("Upload file: ", response);
      fs.unlinkSync(localFilePath); // delete file from local after uploading to cloudinary
      return response;
    } catch (error) {
      // You can write logic to upload it again. I won't
      fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation failed
      return null;
    }
  };

  export default uploadOnCloudinary;