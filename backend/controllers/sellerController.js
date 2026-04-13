

import sellerService from '../service/SellerService.js';
import VerificationCode from '../models/VerificationCode.js';
import jwtProvider from '../utils/jwtProvider.js';
import UserRole from '../domain/UserRole.js';

class SellerController {

  async getSellerProfile(req, res) {
    try {
      const jwt = req.headers.authorization.split(' ')[1]; // Assuming JWT is sent in the Authorization header
      const seller = await sellerService.getSellerProfile(jwt);
      res.status(200).json(seller);
    } catch (error) {
      res.status(error instanceof Error ? 404 : 500).json({ error: error.message });
    }   
  }

  async createSeller(req, res) {
    try {
      const sellerData = req.body;
      const seller = await sellerService.createSeller(sellerData);
      res.status(201).json({ message: 'Seller created successfully', seller });
    } catch (error) {
      res.status(error instanceof Error ? 404 : 500).json({ error: error.message });
    }
  }

  async getAllSellers(req, res) {
    try{
      const status = req.query.status;
      const seller = await sellerService.getAllSellers(status);
      res.status(200).json(seller);
    } catch(error){
      res.status(error instanceof Error ? 404 : 500).json({ error: error.message });
    }
  }

  async updateSeller(req, res) {
    try{
      const existingSeller = await req.seller; // Assuming the existing seller is attached to the request object
      const sellerData = req.body;
      const updatedSeller = await sellerService.updateSeller(existingSeller, sellerData);
      res.status(200).json({ message: 'Seller updated successfully', updatedSeller });
    } catch (error) {
      res.status(error instanceof Error ? 404 : 500).json({ error: error.message });
    }
  }

  async deleteSeller(req, res) {
    try{
      const sellerId = req.params.id;
      await sellerService.deleteSeller(sellerId);
      res.status(200).json({ message: 'Seller account deleted successfully' });
    } catch (error) {
      res.status(error instanceof Error ? 404 : 500).json({ error: error.message });
    }
  }

  async updateSellerAccountStatus(req, res) {
    try{
      const updatedSeller = await sellerService.updateSellerAccountStatus(req.params.id, req.body.status);
      res.status(200).json({ message: 'Seller account status updated successfully', updatedSeller });

    } catch (error) {
      res.status(error instanceof Error ? 404 : 500).json({ error: error.message });
    }
  }

  async verifyLoginOtp(req, res) {
    try{
      const{ email, otp } = req.body;
      const seller = await sellerService.getSellerByEmail(email);
      const verificationCode = await VerificationCode.findOne({ email });

      if(!verificationCode || verificationCode.otp !== otp){
        throw new Error('Invalid OTP');
      }

      const token = jwtProvider.createJWT({ email });

      const authResponse = {
        message: "Login successful",
        jwt: token,
        role:UserRole.SELLER
      }

      return res.status(200).json(authResponse);

    }catch(error){
      res.status(error instanceof Error ? 404 : 500).json({ error: error.message });
    }
  }
}

export default new SellerController();