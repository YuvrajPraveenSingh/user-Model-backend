import { ApiError } from '../utils/ApiError.js';
import {asyncHandler} from '../utils/asynchandler.js';
import {User} from '../models/user.model.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';


const registerUser = asyncHandler(async (req , res) => {
  const{username , email, fullname, password} =  req.body;
    
  /* handle registation data feilds */
  if( [fullname,username,email,password].some((field) => field === undefined || field?.trim() === "")){
    throw new ApiError(400 ,"All fields are required");
  }
  const ExistingUser = User.findOne({$or:[{username},{email}] })
  if(ExistingUser){
    throw new ApiError(400 ,"User already exists");
  }

  /* handle registation image/file feilds */
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if(!avatarLocalPath ){
    throw new ApiError(400 ,"AvatarLocalpath is required");
  }
  
 const avatar = await uploadToCloudinary(avatarLocalPath);
 const coverImage = coverImageLocalPath ? await uploadToCloudinary(coverImageLocalPath) : null;
 if(!avatar ){
    throw new ApiError(400 ,"Avatar Not uploaded To Cloudinary");
 }
 const user = await User.create({
    username,
    email,
    fullname,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || ""
  })
  const CreatedUser = User.findById(user._id).select("-password -refreshToken");
  if(!CreatedUser){
    throw new ApiError(500 ," something went wrong : User was Not Created");
  }

    res.status(201).json(
        new ApiResponse(201, CreatedUser, "User Created Successfully")
    );
  
})


export {registerUser};