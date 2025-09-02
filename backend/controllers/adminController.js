const bcrypt = require('bcryptjs');
const { Admin } = require('../models');
const { sendOTP } = require('../utils/otp');

const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.admin.id, {
      attributes: ['id', 'name', 'email', 'type', 'mobile', 'photo']
    });
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateAdmin = async (req, res) => {
  const { name, email, mobile, photo } = req.body;
  try {
    const admin = await Admin.findByPk(req.admin.id);
    if (name) admin.name = name;
    if (email) admin.email = email;
    if (mobile) admin.mobile = mobile;
    if (photo) admin.photo = photo;
    await admin.save();
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword, otp } = req.body;
  try {
    const admin = await Admin.findByPk(req.admin.id);
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid old password' });
    }

    // Verify OTP
    const isValidOTP = await verifyOTP(admin.mobile, otp);
    if (!isValidOTP) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getAdmin, updateAdmin, changePassword };