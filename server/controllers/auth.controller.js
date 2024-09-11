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
            password: hashedPassword,
            verified: false //user is initially unverified until their token in verification email is verified
        });
    try {
        await newUser.save();
        // | generate a token
        const token = generateVerificationToken(newUser._id); //mongoDB automatically generates an "_id" 
                                            //whenever a new user is created

        // | send verification email
        const verificationLink = `http://localhost:3000/signup/verify/${token}`;
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


export const verifyemail = async (req, res, next)=>{
    const {token} = req.params;
    try {
        // | verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // | find user in DB by ID 
        const user = await User.findById(decoded.id);
        
        if(!user){
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        if (user.verified){
            return res.status(400).json({ //400: bad request
                status: 'fail',
                message: 'Email has already been verified'
            });
        }

        user.verified = true;
        await user.save();
        res.status(200).json({ 
            status: 'successful',
            message: 'User verified successfully'
        });

    } catch (error) {
        if (error.name === 'TokenExpiredError'){
            return res.status(400).json({
                status: 'fail',
                message: 'Verification link has expired'
            });
        }
        res.status(400).json({
            status: 'fail',
            message: 'Invalid token'
        });
    }
};