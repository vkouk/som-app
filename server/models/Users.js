const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        require: true,
        minLength: 1
    },
    password: {
        type: String,
        minLength: 5,
        require: true
    }
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
};

userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            user.password = hash;
            next();
        });
    });
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;