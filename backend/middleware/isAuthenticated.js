import {User} from '../models/userModels.js';
import jwt from 'jsonwebtoken';


export const isAuthenticated = async (req,res,next) => {
  try{
    const authHeader = req.headers.authorization;
    if(!(authHeader && authHeader.startsWith('Bearer'))){
      return res.status(400).json({
        success:false,
        message:"Authorization token is missing or invalid"
      })
    }
    const token = authHeader.split(' ')[1];
    let decoded;
    try{
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch(error){
      if(error.name === 'TokenExpiredError'){
        return res.status(400).json({
          success:false,
          message:"Token has expired"
        })
      }
      return res.status(400).json({
        success:false,
        message:"Access token is missing or invalid"
      })
    }
    const user = await User.findById(decoded.id);
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      })
    }
    req.user = user;  // Attach user object to request for use in subsequent middleware or route handlers
    req.id = user._id;
    next();

  } catch(error){
    res.status(500).json({
      success:false,
      message:`Error in authenticating user: ${error.message}`
    })
  }
}

export const isAdmin = async (req,res,next) => {
  if(req.user && req.user.role === 'admin'){
    next();
  } else {
    res.status(403).json({
      success:false,
      message:"Access denied: Admins only"
    })
  }
}

