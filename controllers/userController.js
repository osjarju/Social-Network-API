const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID found' })
                    : res.json(user)
            )
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
        User.findOneAndDelete(req.body)
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID found' })
                    : res.json(user)
            )
            .catch((err) => res.staus(500).json(err));
    },
    //Update a thought
    addThought(req, res) {
        Thought.findOneAndUpdate(req.body)
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID found' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //remove thought
    removeThought(req, res) {
        Thought.findOneAndRemove(req.body)
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID found' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};