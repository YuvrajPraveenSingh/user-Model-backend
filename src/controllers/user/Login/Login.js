import { ApiError } from '../../../utils/ApiError.js';
import {asyncHandler} from '../../../utils/asynchandler.js';
import {User} from '../../../models/user.model.js';
import { ApiResponse } from '../../../utils/ApiResponse.js';
import { genrateAccessAndRefreshToken } from '../../../utils/generateBothToken.js';

 const Login =  asyncHandler(async (req , res) => {
    const {email , username , password}= req.body;
    if(!email || !username){
      throw new ApiError(401 ,"Email or Username is required");
    }
    const user = await User.findOne({$or:[{email},{username}]});
    if(!user){
      throw new ApiError(404 ,"User Not Found");
    }
    const isPasswordMatch = await user.isPasswordCorrect(password);
    if(!isPasswordMatch){
      throw new ApiError(401 ,"Invalid Credentials");
    }
    const {accesToken, refreshToken}= await genrateAccessAndRefreshToken(user._id);


    const LoggedInUser = user.findById(user.id).select( "-password -refreshToken");

    const options ={
        httpOnly: true,
        secure: true,

    }

    return res.status(200)
    .cookie("accessToken" ,accesToken ,options)
    .cookie("refreshToken", refreshToken ,options)
    .json(new ApiResponse(200, {
        user:LoggedInUser,accesToken,refreshToken
    }, "User Logged In"));

 });

export{Login}