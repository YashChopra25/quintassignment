import mongoose from "mongoose";
import bcrypt from "bcrypt"
mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
    
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps:true
})

UserSchema.pre("save", async function(next){
    if(this.isModified('password')) 
    this.password= await bcrypt.hash(this.password,8)
    next();
})



export const user=mongoose.models.user || mongoose.model("user",UserSchema)
