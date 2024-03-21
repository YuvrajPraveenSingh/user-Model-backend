import { Register } from "./register/register.js";
import { Login } from "./Login/Login.js";
import { logout  as LogOut} from "./Logout/logout.js";


 const registerUser = Register;
 const loginUser = Login; 
 const logoutUser = LogOut;

export {registerUser , loginUser};