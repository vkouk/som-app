const User = require('../models/Users');
const jwt = require('jwt-simple');
const config = require('../config/keys');

const userToken = user => {
    return jwt.encode({ sub: user._id, iat: new Date().getTime() }, config.secret);
};

exports.signin = (req, res) => {
    res.send({ token: userToken(req.user) });
};

exports.signup = async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).send({ error: 'You must provide email and password' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(422).send({ error: 'Email already in use' });
    }

    const user = new User({ email, password });

    await user.save(err => {
        if (err) { next(err); }

        res.send({ token: userToken(user) });
    });
};