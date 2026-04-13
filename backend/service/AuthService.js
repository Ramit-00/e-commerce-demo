import Seller from '../models/Seller.js';
import VerificationCode from '../models/VerificationCode.js';
import generateOTP from '../utils/generateOTP.js';
import sendVerificationEmail from '../utils/sendVerificationEmail.js';

class AuthService {

  async sendLoginOtp(email) {

    const SIGNIN_PRIFIX = "signin-";

    if(email.startsWith(SIGNIN_PRIFIX)){
      const seller = await Seller.findOne({ email });
      if (!seller) {
        throw new Error('Seller not found');
      } 
    }


    const existingVerificationCode = await VerificationCode.findOne({ email });
    if(existingVerificationCode){
      await VerificationCode.deleteOne({ email });
    }

    const otp = generateOTP();
    const verificationCode = new VerificationCode({ email, otp });
    await verificationCode.save();

    // send email to seller
    const subject = " Your Login OTP for E-commerce Platform";
    const body = `<p>Your OTP for logging into the E-commerce platform is: <strong>${otp}</strong></p>`;

    await sendVerificationEmail(email, subject, body);
  }
}