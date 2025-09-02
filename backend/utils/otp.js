const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendOTP = async (mobile, otp) => {
  try {
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobile
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

// This is a placeholder. In a real app, you would store the OTP and verify it.
const verifyOTP = async (mobile, otp) => {
  // Implement OTP verification logic (e.g., check against stored OTP in DB or cache)
  return true; // For demo
};

module.exports = { sendOTP, verifyOTP };