const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/Users');
const keys = require('../config/keys');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('x-auth'),
    secretOrKey: keys.secret
};

passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    const userId = mongoose.Types.ObjectId(id);
    User.findById(userId).then(user => {
        done(null, user);
    });
});

passport.use(new LocalStrategy(
        {
            usernameField: 'email',
        },
        (email, password, done) => {
            User.findOne({ email }, (err, user) => {
               if (err) { return done(err); }
               if (!user) { return done(null, false); }

               user.comparePassword(password, (err, isMatch) => {
                  if (err) { return done(err); }
                  if (!isMatch) { return done(null, false); }

                  return done(null, user);
               });
            });
        }
    )
);