const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((req, id, done) => {
    req.db.select('id')
        .from('users')
        .where('id', '=', id)
        .then((user, err) => {
            if (err) done(err);
            done(err, user[0]);
        });
});

passport.use('local-login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },
        (req, email, password, done) => {
            return req.db.select('email', 'password').from('users')
                .where('email', '=', email)
                .then(data => {
                    const validPswd = bcrypt.compareSync(password, data[0].password);
                    if (validPswd) {
                        return req.db.select('*').from('users')
                            .where('email', '=', email)
                            .then(user => {
                                return done(null, user[0]);
                            })
                            .catch(err => done(err))
                    } else {
                        return done(null, false, { message: 'Wrong credentials' })
                    }
                })
                .catch(err => done(err));
    })
);

passport.use('local-register',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },
        async (req, email, password, done) => {
            const hashPassword = bcrypt.hashSync(password);
            const existingUser = await req.db.select('email')
                .from('users')
                .where('email', '=', email)
                .then((rows, err) => {
                    if (err) done(err);

                    if (rows.length) {
                        return done(null, false, { message: 'This email is already taken.' });
                    }
                });

            if (existingUser) {
                return done(null, existingUser);
            }

            const user = await req.db('users').insert({'email': email, 'password': hashPassword});
            done(null, user);
        }
    )
);