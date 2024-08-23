const mongoose = require("mongoose")
const User = require('./user')

const commentSchema = new mongoose.Schema(
    {
        content:{
            type: String,
            required: true,
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
        },
        createdAt:{
            type: String,
            default: Date.now,


        }
    }
)
const comment = mongoose.model('comment', commentSchema)
module.exports = comment;