module.exports = (req, res, next) => {
  if (!req.user) {
      res.status(401).send({'error': 'No user found!'});
  }

  next();
};