import mongoose from 'mongoose';
import UserRole from '../domain/UserRole.js';
import AccountStatus from '../domain/AccountStatus.js';

const sellerSchema = new mongoose.Schema({
  sellerName:{type:String,required:true},
  mobileNumber:{type:Number,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true,select:false},
  buisnessDetails:{
    buissnessName:{type:String,required:true},
    buissnessEmail:{type:String,required:true},
    buissnessNumber:{type:Number,required:true},
    buissnessAddress:{type:String,required:true},
  },
  bankDetails:{
    accountNumber:{type:Number,required:true},
    accountHolderName:{type:String,required:true},
    ifscCode:{type:String,required:true},
    bankName:{type:String,required:true},
  },
  pickupAddress:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Address"        // Name of the model for pickup address
  },
  GSTIN:{type:String,required:true},
  role:{
    type:String,
    enum:[UserRole.SELLER],
    default:UserRole.SELLER
  },
  accountStatus:{
    type:String,
    enum:[
      AccountStatus.PENDING_VERIFICATION,
      AccountStatus.ACTIVE,
      AccountStatus.SUSPENDED,  
      AccountStatus.DEACTIVATED,
      AccountStatus.BANNED,
      AccountStatus.CLOSED],

    default:AccountStatus.PENDING_VERIFICATION
    
  }

},{timestamps:true})

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;