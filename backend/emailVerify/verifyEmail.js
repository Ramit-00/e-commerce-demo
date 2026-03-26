import nodemailer from 'nodemailer';
import 'dotenv/config';

const verify = (token, email) => {

  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
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

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log('Error Occurs');
    } else {
      console.log('Email sent successfully');
      console.log(data);
    }
  });
}

export { verify };

