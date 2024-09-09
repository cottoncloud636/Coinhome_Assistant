import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    // name:{
    //     type: String,
    //     required: [true, 'A user must have a name'],
    //     maxLength:[40, 'A name should be less than 60 characters'],// built-in validator
    //     minLength:[1, 'A name should be at least 1 characters']
    // },
    email:{
        type: String,
        unique: true, 
        required: [true, 'An email is required'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password:{
        type: String,
        required: [true, 'A password is required'],
        minLength: [8, 'A password must contain at least 8 characters'],
        // maxLength: [20, 'A password should not be more 20 characters'],
        select: false //set to false so that psw will never show up at any output
    }, 
    verified: {
        type: Boolean,
        default: false  // User is unverified by default
      }
},
    //besides that, timestamps info is very useful, will record time of user account created and updated, which is
    //useful for searching user account in the future
    {
        timestamps : true
    }
);


const User = mongoose.model('User', userSchema); //create a model called "User", serve as an interface to DB
export default User;