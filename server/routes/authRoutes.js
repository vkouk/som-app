const Authentication = require('../controllers/Authentication');
const passport = require('passport');

module.exports = app => {
    app.post('/api/login', passport.authenticate('local', { session: false }), Authentication.signin);
    app.post('/api/register', Authentication.signup);
    app.get('/api/current_user', passport.authenticate('jwt', { session: false }), function(req, res) {
        res.send(req.user);
    });
};