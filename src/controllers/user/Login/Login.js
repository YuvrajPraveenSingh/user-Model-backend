import { ApiError } from "../../../utils/ApiError.js";
import { asyncHandler } from "../../../utils/asynchandler.js";
import { User } from "../../../models/user.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { genrateAccessAndRefreshToken } from "../../../utils/generateBothToken.js";

const Login = asyncHandler(async (req, res) =>
 {
  
    const { username, email, password } = req.body;
  
    const options = {
        httpOnly: true,
       
    };

    /* checking and loging user  */
    if (!(username || email) || !password){
      throw new Error('Username/email and password are required');
    }
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
        throw new ApiError(404, "User Not Found");
    }
    const isPasswordMatch = await user.isPasswordCorrect(password);
    if (!isPasswordMatch) {
        throw new ApiError(401, "Invalid Credentials");
    }
    const { accessToken, refreshToken } = await genrateAccessAndRefreshToken(
        user._id
    );

    const LoggedInUser = await User.findById(user.id).select("-password -refreshToken")

  
        
    /* coockie setting */
    return  res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: LoggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User Logged In"
            )

        );
       
       
    

  }
);

export { Login };
