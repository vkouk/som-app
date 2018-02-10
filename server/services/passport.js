const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    const userId = mongoose.Types.ObjectId(id);
    User.findById(userId).then(user => {
        done(null, user);
    });
});

passport.use('local-login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            User.findOne({ email }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user);
            });
    })
);

passport.use('local-register',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            const hashPassword = bcrypt.hashSync(password);
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return done(null, existingUser);
            }

            const user = await new User({ email: email, password: hashPassword }).save();
            done(null, user);
        }
    )
);