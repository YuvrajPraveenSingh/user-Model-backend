import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username:{
        type : String,
        require: true ,
        unique: true,
        lowercase: true,
        trim: true,
        index:true
    },
   email:{
        type : String,
        require: true ,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname:{
        type : String,
        require: true ,
        trim: true,
        index:true
    },
    avatar:{
        type:String, //cloudinary url
        require:true
    },
    coverImage:{
       type: String //cloudinary url
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "video"
        }
    ],
    password:{
        type: String,
        require: [true, "Password is required"],
        min:8,
    },
    refreshToken:{
        type: String,
        
    }
    },{timestamps:true});

// encrypt password before saving
userSchema.pre("save" ,async function(next){
   if(!this.isModified("password")) return next();  

   this.password = await bcrypt.hash(this.password, 10);
   next();
});

// check if password is correct
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

// generate access token
userSchema.methods.generateAcessToken= function(){
    jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
    }
    )
}

// generate refresh token
userSchema.methods.generateRefreshToken= function(){
    jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_LIFE,
    }
    )
}
    

export const User = mongoose.model("User", userSchema);
