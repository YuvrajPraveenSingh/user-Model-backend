import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`, 
  api_secret: `${process.env.CLOUDINARY_API_SECRET}` 
});

const uploadToCloudinary = async (filePath)=>{
    try{
        if(!filePath) throw new Error("File path is required");
        const response = await cloudinary.uploader.upload(filePath,{
            resource_type: "auto",
        });
        console.log("File uploaded successfully" , response.url);
        fs.unlinkSync(filePath); // remove file from server after upload
        return response;
    }catch(error){
        console.log("colud uploaded error" );
        fs.unlinkSync(filePath); // remove file from server if upload fails
        return null;
    }
}

const deleteFromCloudinary = async (publicId)=>{
    try{
        if(!publicId) throw new Error("Public id is required");
        const response = await cloudinary.uploader.destroy(publicId);
        console.log("File deleted successfully" , response);
        return response;
    }catch(error){
        return null;
    }
}


export {uploadToCloudinary , deleteFromCloudinary};