'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * User Schema
 */

var SubmissionSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    icon: Buffer,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    numberOfStars: Number,
    created: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('Submission', SubmissionSchema );
