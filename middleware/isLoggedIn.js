module.exports = function(req, res, next) {
  if (!req.member) {
    req.flash('error', 'You must be logged in to access that page');
    res.redirect('/auth/login');
  } else {
    next();
  }
};
