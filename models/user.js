'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * User Schema
 */

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, default: '' },
    username: { type: String, default: '' },
    walledID: { type: String, default: '' },
    password: { type: String, default: '' }
});



mongoose.model('User', UserSchema);
