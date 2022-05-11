const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    songName: {
        type: String,
        required: [true, 'song cannot be empty']
    },
    releaseDate: {
        type: Number,
        required: [true, 'date cannot be empty']
    },
    link: {
        type: String,
        required: [true, 'link cannot be empty']
    },
    album: {
        type: String,
        required: [true, 'album cannot be empty']
    },
    songImg: {
        type: String,
        required: [true, 'image cannot be empty']
    },
    stream: {
        type: mongoose.Types.ObjectId,
        ref: "StreamDream"
    }
})


const Song = mongoose.model("Song", songSchema)
module.exports = Song