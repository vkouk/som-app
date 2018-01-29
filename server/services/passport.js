const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    
});

passport.use('local-login',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {


    })
);

passport.use('local-register',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {

    })
);