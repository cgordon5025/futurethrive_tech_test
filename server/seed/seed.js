const db = require('../config/connection');
const { User, Results, Video } = require('../models');

const userData = require('./userData.json');
const resultData = require('./resultsData.json');
const videoData = require('./videoData.json');

db.once('open', async () => {
    await User.deleteMany({});
    await Results.deleteMany({});
    await Video.deleteMany({});

    const users = await User.create(userData);
    const results = await Results.create(resultData);
    const video = await Video.create(videoData);

    for (newResults of results) {
        const tempUser = users[Math.floor(Math.random() * users.length)];
        tempUser.results.push(newResults._id)
        await tempUser.save()
    }

    for (newVideo of video) {
        const tempUser = users[Math.floor(Math.random() * users.length)];
        tempUser.video.push(newVideo._id)
        await tempUser.save()
    }
    console.log('all done');
    process.exit(0);
});