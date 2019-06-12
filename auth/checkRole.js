module.exports = function(role) {
  return function(req, res, next) {
    if (req.user) {
      if (req.user.roles) {
        next();
      } else {
        res.status(403).json({ message: `can't access this!` });
      }
    } else {
      res.status(403).json({ message: 'you cannot pass!' });
    }
  };
};
