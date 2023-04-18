const connection = require('../config/connection');
const { User, Thought } = require('../models');

const {
    getRandonName,
    getRandomIndex,
    getRandomUser,
    getRandomThoughts,
} = require('./data');

console.time('seeding');

connection.once('open', async () => {

    await User.deleteMany({});
    await Thought.deleteMany({});

    const thoughts = [...getRandomThoughts(10)];
    const users = [];

    const makeUser = (text) => {
        users.push({
            text,
            username: getRandonName().split(' ')[0],
            thoughts: [thoughts[getRandomIndex(thoughts)]._id],
        });
    };

    await Thought.collection.insertMany(thoughts);

    thoughts.forEach(() => makeUser(getRandomUser(10)));

    await User.collection.insertMany(users);

    console.table(thoughts);
    console.table(users);
    console.timeEnd('seeding complete');
    process.exit(0);
});
