
import { asyncHandler } from "../../../utils/asynchandler.js";
import { User } from "../../../models/user.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";


/* has used Auth middlle in <logout> routes before this */
const logout = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const options = {httpOnly:true};
    await User.findByIdAndUpdate(user, {
        $set: {
            refreshToken: "",
        },
    });

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out"));
});
export { logout };
