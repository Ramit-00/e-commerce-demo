import Seller from '../models/sellerModel.js';
import { Address } from '../models/Address.js';
import jwtProvider from '../utils/jwtProvider.js';

class SellerService {

  async createSeller(sellerData) {
    const existingSeller = await Seller.findOne({ email: sellerData.email });
    if (existingSeller) {
      throw new Error('Seller with this email already exists');
    }

    let savedAddress = await Address.create(sellerData.pickupAddress);
    savedAddress = await Address.create(sellerData.pickupAddress);

    const newSeller = new Seller({
      sellerName: sellerData.sellerName,
      email: sellerData.email,
      password: sellerData.password,
      mobileNumber: sellerData.mobileNumber,
      pickupAddress: savedAddress._id,
      GSTIN: sellerData.GSTIN,
      buissnessDetails:sellerData.buisnessDetails,
      bankDetails:sellerData.bankDetails
    });

    return await newSeller.save();
  }

  async getSellerProfile(jwt){
    const email = jwtProvider.getEmailFromJWT(jwt);
    return this.getSellerByEmail(email);
  }

  async getSellerByEmail(email){
    const seller = await Seller.findByEmail(email);
    if (!seller) {
      throw new Error('Seller not found');
    }
    return seller;
  }

  async getSellerById(sellerId){
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      throw new Error('Seller not found');
    }
    return seller;
  }

  async getAllSellers(status){
    return await Seller.find({ accountStatus: status });
  }

  async updateSeller(existingSeller,SellerData){
    return await Seller.findByIdAndUpdate(existingSeller._id,SellerData,{new:true});
  }

  async updateSellerAccountStatus(sellerId,status){
    return await Seller.findByIdAndUpdate(
      sellerId,
      {$set:{accountStatus:status}},          // Only update the accountStatus field
      {new:true});
  }
}

export default new SellerService();