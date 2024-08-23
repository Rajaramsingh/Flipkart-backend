const mongoose = require("mongoose");
const User = require("./user");
const Comment = require("./comment")

const tweetSchema = new mongoose.Schema(
    {
        content:{
            type: String,
            required: true,
            trim: true,
            maxlength: 300,
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true,

        },
        createdAt:{
            type: Date,
            default:Date.now,
        },
        likes:[{
            types: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        retweet:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet',
        }],
        comment:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }],

})
const Tweet = mongoose.model('Tweet', tweetSchema )
module.exports = Tweet
