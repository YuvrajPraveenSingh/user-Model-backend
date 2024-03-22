import { ApiError } from "./ApiError.js";
import {User} from '../models/user.model.js';

const  genrateAccessAndRefreshToken = async (userId) =>{
    try {
        const user =await User.findById(userId);
        const accessToken = await user.generateAcessToken();
        const refreshToken =await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, error.message);
        
    }
};

export {genrateAccessAndRefreshToken}