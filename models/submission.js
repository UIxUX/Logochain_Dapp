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

var SubmissionSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    icon: { data: Buffer, contentType: String },
    price: Number,
    index: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    upvotes: [{
        user: { type : Schema.ObjectId, ref : 'User' },
        createdAt: { type : Date, default : Date.now }
    }],
    created: {
        type: Date,
        default: Date.now
    }
});


var Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;