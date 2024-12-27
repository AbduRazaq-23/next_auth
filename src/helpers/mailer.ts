import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error("Invalid email address provided.");
    }

    // Hash the userId
    const hashedToken = await bcryptjs.hash(String(userId), 10);

    // Update the user document
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else {
      throw new Error("Invalid email type");
    }

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAPER_USER,
        pass: process.env.MAILTRAPER_PASSWORD,
      },
    });

    // Define mail options
    const mailOptions = {
      from: "abdurazaq.dev23@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>
          Click <a href="${
            process.env.DOMAIN
          }/verifyemail?token=${hashedToken}">
          here</a> to ${
            emailType === "VERIFY" ? "verify your email" : "reset your password"
          }.
        </p>
      `,
    };

    // Send the email
    const mailResponse = await transporter.sendMail(mailOptions);

    console.log("Mail sent successfully:", mailResponse);
    return mailResponse;
  } catch (error: any) {
    console.error("Error in sendEmail:", error.message);
    throw new Error(error.message);
  }
};
