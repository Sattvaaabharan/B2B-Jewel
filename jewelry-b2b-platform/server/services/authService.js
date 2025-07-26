const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (userData) => {
  const userExists = await User.findOne({ email: userData.email });
  if (userExists) throw new Error('Email already registered');
  
  const user = new User(userData);
  await user.save();
  return user;
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  return { user, token };
};
