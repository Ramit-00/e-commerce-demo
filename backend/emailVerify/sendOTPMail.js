import nodemailer from 'nodemailer';
import 'dotenv/config';

const sendOTPMail = async (otp, email) => {
  try {
    let mailTransporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    let mailDetails = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'password reset OTP',
      html: `<p>Your OTP for password reset is: <b>${otp}</b>. It will expire in 10 minutes.</p>`,
    };

    await mailTransporter.sendMail(mailDetails);
    console.log(`otp sent successfully to ${email}`);
  } catch (err) {
    console.log('Error sending email:', err.message);
  }
}

export { sendOTPMail };

