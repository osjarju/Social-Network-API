const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const User = model('user', userSchema);

module.exports = User;