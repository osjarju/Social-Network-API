const { Thought, User, Reaction } = require('../models');
const userController = require('./userController');

module.exports = {
    //Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    //Get a thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            // .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID found' })
                    : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    //Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID found' })
                    : User.deleteMany({ _id: { $in: thought.users } })
            )
            .then(() => res.json({ message: 'Thought and user deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    //Remove a thought
    removeThought(req, res) {
        Thought.findOneAndRemove(req.body)
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID found' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    //Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID found' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // addReaction will be similar to the addFriend, except instead of passing a 
    //friendId in the params, you want to pass the reaction in the req.body
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body.reaction } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that ID found" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Reaction.findByIdAndDelete(
            { _id: req.params.userId },
            { $pullSet: { friends: req.params.reactionId } },
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
