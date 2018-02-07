const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const knex = require('knex');
const keys = require('./config/keys');
require('./services/passport');

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 1 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use((req, res, next) => {
    req.db = knex({
        client: 'mysql',
        connection: {
            host : keys.database.host,
            user : keys.database.user,
            password : keys.database.password,
            database : keys.database.database,
            port     : keys.database.port
        }
    });

    next();
});
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);