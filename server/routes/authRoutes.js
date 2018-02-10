const passport = require('passport');

module.exports = app => {
    app.post('/api/login', passport.authenticate('local-login'));

    app.post('/api/register', passport.authenticate('local-register'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send('Logout!');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};