const bcrypt = require('bcrypt');
const User = require('../models/User');
const Category = require('../models/Category');
const Courses = require('../models/Course');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      await bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          //user session
          req.session.userID = user._id;
          res.status(200).redirect('/users/dashboard');
        }
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  const categories = await Category.find();
  const courses = await Courses.find({ user: req.session.userID });
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses,
  });
};
