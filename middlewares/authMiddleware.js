const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userID);
    if (!user) {
      return res.redirect('/login');
    }
    next();
  } catch (err) {
    return res.redirect('/login');
  }
}