import { app } from './app.js';
import connectDB from './db/index.js';
import dotenv from "dotenv"

dotenv.config({
    path:'./env'
})


connectDB()
.then(()=>{
    app.on("error" , (err)=>{
        console.log("error" , err);
    })
    app.listen(process.env.PORT || 8000, (err) =>{
        console.log(`Server is Up And Running at ${process.env.PORT}`)
    })
})
.catch((err)=> {
    console.log("MongoDb Connection Fail !!!" , err)
});