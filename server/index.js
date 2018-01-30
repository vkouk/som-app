const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Database = require('./services/database');
require('./services/passport');

const app = express();
const database = new Database();

app.use(bodyParser.json());
app.use((req, res, next) => {
    req.db = database;

    next();
});
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);