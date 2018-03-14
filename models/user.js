'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');


/**
 * User Schema
 */

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, default: '' },
    username: { type: String, default: '' },
    walletID: { type: String, default: '' },
    password: { type: String, default: '' }
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


var User = mongoose.model('User', UserSchema);
module.exports = User;
