import {User} from "../models/userModels.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { Session } from "../models/sessionModels.js";
import 'dotenv/config';

export const register = async(req,res)=>{
  try{
    const{firstName,lastName,email,password} = req.body;
    if(!firstName || !lastName || !email || !password){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }

    const user = await User.findOne({email});
    if(user){
      return res.status(409).json({
        success:false,
        message:"User already exists"
      })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password : hashedPassword

    })

    const token = jwt.sign({id:newUser._id} , process.env.SECRET_KEY, {expiresIn:"10m"});

    await verifyEmail(token,email);  // send email here
    newUser.token = token;

    await newUser.save();

    res.status(201).json({
      success:true,
      message:"User registered successfully",
      user:newUser
    })
  } catch(error){
    res.status(500).json({
      success:false,
      message:`Error in registering user: ${error.message}`
    })
  }
}

export const verify = async (req, res) => {
  try{
    const authHeader = req.headers.authorization;
    if(!(authHeader && authHeader.startsWith('Bearer'))){
      res.status(400).json({
        success:false,
        message:"Authorization token is missing or invalid"
      })
    }

    const token = authHeader.split(' ')[1];  // ['Bearer', 'tokenValue'] => tokenValue  // Authorization: Bearer <token>

    let decoded;
    try{
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch(err){
      if(error.name === 'TokenExpiredError'){
        return res.status(400).json({
          success:false,
          message:"Token has expired"
        })
      } else {
        return res.status(400).json({
          success:false,
          message:"token verification failed"
        })
      }
    }

    const user = await User.findById(decoded.id);
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      })
    }

    user.token = null;
    user.isVerified = true;
    await user.save();
    return res.status(200).json({
      success:true,
      message:"Email verified successfully"
    })

  } catch(error){
    res.status(500).json({
      success:false,
      message:`Error in verifying user: ${error.message}`
    })
  }
}

export const reverify = async(req,res)=>{
try{
  const {email} = req.body;
  const user = await User.findOne({email});
  if(!user){
    return res.status(400).json({
      success:false,
      message:"User not found"
    })
  }
  const token = jwt.sign({id:user._id} , process.env.SECRET_KEY, {expiresIn:"10m"});

  await verifyEmail(token,email);  // send email here
  user.token = token;

  await user.save();

  res.status(201).json({
    success:true,
    message:"verification email sent again successfully",
    token:user.token
  })
} catch(error){
    res.status(500).json({
      success:false,
      message:`Error in re-verifying user: ${error.message}`
    })
  }
}

export const login = async (req,res) => {
  try{
    const {email,password} = req.body;
    if(!(email && password)){
      return res.status(400).json({
        success:false,
        message:"Email and password are required"
      })
    }

    const existingUser = await User.findOne({email});
    if(!existingUser){
      return res.status(404).json({
        success:false,
        message:"User not found"
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect){
      return res.status(400).json({
        success:false,
        message:"Invalid credentials"
      })
    }

    if(existingUser.isVerified === false){
      return res.status(400).json({
        success:false,
        message:"verify your email before logging in"
      })
    }

    // generate token

    const accessToken = jwt.sign({id:existingUser._id} , process.env.SECRET_KEY, {expiresIn:"10d"});
    const refreshToken = jwt.sign({id:existingUser._id} , process.env.SECRET_KEY, {expiresIn:"30d"});

    existingUser.isLoggedIn = true;
    await existingUser.save();

    // check for existing session and delete it before creating a new one
    const existingSession = await Session.findOne({userId:existingUser._id});
    if(existingSession){
      await Session.findByIdAndDelete({userId:existingUser._id});
    }

    // create a new Session
    await Session.create({userId:existingUser._id});

    return res.status(200).json({
      success:true,
      message:`Welcome back ${existingUser.firstName}`,
      user:existingUser,
      accessToken,
      refreshToken
    })

  } catch(error){
    res.status(500).json({
      success:false,
      message:`Error in logging in user: ${error.message}`
    })
  }
}

export const logout = async (req,res) => {
  try{
    const userId = req.id;
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:`Error in logging out user: ${error.message}`
    })
  }
}