import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
const app = express();

// express settings for parsing json , coockies and urlencoded data
app.use(cookieParser())
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials:true,}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({ extended:true,limit:"16kb"}));
app.use(express.static("public"));



// routes import 
import userRouter from "./routes/user.routes.js";


// routes Declaration
app.use("/api/v1/user",userRouter);




export{app};