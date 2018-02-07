const passport = require('passport');

module.exports = app => {
    app.get('/api/users', (req, res) => {
       req.db.select('*').from('users').then(data => {
           res.send(data);
       })
    });

    app.post('/api/login', passport.authenticate('local-login'), (err, user, info) => (req, res, next) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({ success : false, message : info.message });
        }

        req.login(user, (err) => {
            if (err) { return next(err); }

            return res.send({ success : true, message : 'Login Succesfull', user });
        })(req, res, next);
    });

    app.post('/api/register', passport.authenticate('local-register', { session: true }));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send('Logout!');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
        console.log(req.user);
    });
};