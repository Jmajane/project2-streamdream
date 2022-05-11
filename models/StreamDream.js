const mongoose = require('mongoose');

const streamDreamSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: [true, 'artist cannot be empty']
    },
    img: {
        type: String,
        required: [true, 'image cannot be empty']
    },
    headerImg: {
        type: String,
        required: [true, 'header image cannot be empty']
    },
    bio:{
        type: String,
        required: [true, 'bio cannot be empty']
    },
})

const StreamDream = mongoose.model("StreamDream", streamDreamSchema);
module.exports = StreamDream