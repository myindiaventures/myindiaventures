import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS, // your app password
      },
    });

    // Email options
    const mailOptions = {
      from: `"My India Ventures" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
