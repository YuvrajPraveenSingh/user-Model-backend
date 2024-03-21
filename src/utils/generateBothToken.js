import { ApiError } from "./ApiError.js";
import {User} from '../models/user.model.js';

const  genrateAccessAndRefreshToken = async (userId) =>{
    try {
        const user =await User.findById(userId);
        const accesToken = user.generateAcessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = RefreshToken;
        await user.save({validateBeforeSave: false});
        return {accesToken, refreshTokenefreshToken};
    } catch (error) {
        throw new ApiError(500, error.message);
        
    }
};

export {genrateAccessAndRefreshToken}