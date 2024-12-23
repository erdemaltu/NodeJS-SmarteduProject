const User = require('../models/User');

exports.createUser = async (req, res) => {  
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};