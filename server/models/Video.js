const { Schema, model } = require('mongoose')
const VideoSchema = new Schema({
    videofile: {
        type: String
    },
    url:{
        type:String
    }
});

const Video = model('Video', VideoSchema);

module.exports = Video;