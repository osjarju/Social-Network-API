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
        thoughts: {
            //how to set up?
        },
        friends: {
            //how to set up?
        }
    },
    {
        toJSON: {
            getters: true,
        },
        reactions: [reactionSchema],
    }
);

const User = model('user', userSchema);
module.exports = User;