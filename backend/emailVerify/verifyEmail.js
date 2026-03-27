import nodemailer from 'nodemailer';
import 'dotenv/config';

const verifyEmail = async (token, email) => {
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
      subject: 'Email Verification',
      text: `Please verify your email: https://your-front-end-domain.com/verify/${token}`,
    };

    await mailTransporter.sendMail(mailDetails);
    console.log(`Email sent successfully to ${email}`);
  } catch (err) {
    console.log('Error sending email:', err.message);
  }
}

export { verifyEmail };

