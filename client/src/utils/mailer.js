const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net", // GoDaddy SMTP
  port: 465,
  secure: true, // true for 465, false for 587
  auth: {
    user: "bookings@myindiaventures.com",
    pass: "YOUR_EMAIL_PASSWORD", // ⚠️ store securely in .env
  },
});

async function sendBookingMail(to, bookingDetails) {
  try {
    const info = await transporter.sendMail({
      from: '"My India Ventures" <bookings@myindiaventures.com>',
      to, // customer email
      subject: "Your Booking Details - My India Ventures",
      html: `
        <h2>Hi ${bookingDetails.name},</h2>
        <p>Thank you for booking with <b>My India Ventures</b>!</p>
        <p><b>Booking ID:</b> ${bookingDetails.id}</p>
        <p><b>Package:</b> ${bookingDetails.packageName}</p>
        <p><b>Date:</b> ${bookingDetails.date}</p>
        <p>We’ll reach out to you soon with further details.</p>
        <br>
        <p>Warm regards,<br>My India Ventures Team</p>
      `,
    });

    console.log("Mail sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending mail:", error);
  }
}

module.exports = sendBookingMail;
