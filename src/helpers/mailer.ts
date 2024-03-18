import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


export const sendEmail = async({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId,
      {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId,
      {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c1388741b4345a",
        pass: "5a25346e0bd511"
        // TODO: add these credentials to .env file <-- DONE
      }
    });

    // if (emailType === "VERIFY") {
    //   const mailOptions = {
    //     from: "verify@gmail.com",
    //     to: email,
    //     subject: "Verify your email",
    //     html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
    //   }
    // } else if (emailType === "RESET") {
    //   const mailOptions = {
    //     from: "reset@gmail.com",
    //     to: email,
    //     subject: "Reset your password",
    //     html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
    //   }
    // }

    
    const mailOptions = {
      from: "item@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "passwordreset"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "passwordreset"}?token=${hashedToken}
      </p>`
    }

    const mailresponse = await transport.sendMail
      (mailOptions);
    return mailresponse;

  } catch (error:any) {
    throw new Error(error.message)
  }
}