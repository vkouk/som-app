const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const knex = require('knex');
require('./services/passport');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    req.db = knex({
        client: 'mysql',
        connection: {
            host : 'sql2.freemysqlhosting.net',
            user : 'sql2218708',
            password : 'fQ5*yJ5%',
            database : 'sql2218708',
            port     : '3306'
        }
    });

    next();
});
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);