const { Schema, model } = require('mongoose')
const VideoSchema = new Schema({
    filename: {
        type: String
    },
    mimetype: {
        type: String
    },
    encoding: {
        type: String
    },
    url: {
        type: String
    }
});

const Video = model('Video', VideoSchema);

module.exports = Video;