import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js'
import { sendVerificationEmail } from '../utils/emailService.js'; 

const generateVerificationToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN }); // Token expires in 1 day
    return token;
  };

export const signup = async(req, res, next)=>{
    const {email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User(
        {
            email, 
            password: hashedPassword
        });
    try {
        await newUser.save();
        // | generate a token
        const token = generateVerificationToken(newUser._id); //mongoDB automatically generates an "_id" 
                                            //whenever a new user is created

        // | send verification email
        const verificationLink = `http://localhost:3000/verify/${token}`;
        await sendVerificationEmail(email, verificationLink);

    
        res.status(201).json({
            status: 'success',
            token, //token is sent from the server
            message: 'user signup succeeded'
        });
                                                                                       
    } catch (error) {
        next(error);
    }
};