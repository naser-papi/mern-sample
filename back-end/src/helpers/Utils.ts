import mongoose from "mongoose";
import nodemailer from "nodemailer";

export async function sendEmail(address: string, message: string) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASS // generated ethereal password
    }
  });

  const mailOptions = {
    from: process.env.SMTP_SENDER, // sender address
    to: address,
    subject: "Sending Email using Node.js",
    html: message,
    amp: message //"<b>Hello world?</b>", // html body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
export async function validateEmail(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isValid = re.test(email);
  if (!isValid) return false;

  if (!this.isNew && !this.isModified("email")) return true;

  try {
    const User = mongoose.model("User");

    const count = await User.countDocuments({ email: email });
    return count <= 0;
  } catch (error) {
    return false;
  }
}
