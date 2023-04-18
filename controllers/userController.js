const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    //Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID found' })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    //Create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    //delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: new ObjectId(req.params.userId) })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID found' })
                    : res.json(user)
            )
            .catch((err) => res.staus(500).json(err));
    },

    //UPDATE USER
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID found' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // we want to save other user IDS to the friends array of another user
    addFriend(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID found' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // For the delete friend route, instead of $addToSet, you want to use $pull
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID found' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};