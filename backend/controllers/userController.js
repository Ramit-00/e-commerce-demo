import {User} from "../models/userModels.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verify } from "../emailVerify/verifyEmail.js";

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

    await newUser.save();

    verify(token,email);  // send email here
    newUser.token = token;

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