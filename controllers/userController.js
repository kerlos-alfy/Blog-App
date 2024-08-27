const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ApiError = require('../utils/apiError');
// @desc    Add User
// @route   POST  /api/v1/users/register
// @access  Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, gender, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ApiError('User already exists', 400));
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    gender,
    role,
  });
  newUser.save();
  // eslint-disable-next-line no-undef
  const SECRET_KEY = process.env.SECRET_KEY;
  const token = await jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, SECRET_KEY, {
    expiresIn: '30d',
  });
  res.status(201).json({ message: 'User created', newUser, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError('Invalid email or password', 401));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ApiError('Invalid email or password', 401));
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    // eslint-disable-next-line no-undef
    process.env.SECRET_KEY,
    { expiresIn: '30d' }
  );
  res.status(200).json({ message: 'Login successful', user, token });
});
