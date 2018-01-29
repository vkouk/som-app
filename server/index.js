const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const Database = require('./services/database');
const keys = require('./config/keys');
require('./services/passport');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    new Database();
    next();
});
app.use(
    cookieSession({
        maxAge: 7 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);