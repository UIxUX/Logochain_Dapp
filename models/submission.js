
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');


/**
 * Submission Schema
 */

var SubmissionSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    icon: { data: Buffer, contentType: String },
    price: Number,
    docindex: Number,
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    buyer: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    upvotes: [{
        walletID: {type: String, default : ''}, //{ type : Schema.ObjectId, ref : 'User' },
        createdAt: { type : Date, default : Date.now }
    }],
    created: {
        type: Date,
        default: Date.now
    }
});


var Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;