const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');
require('./models/Users');
require('./models/Supplies');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 5 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/suppliesRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);