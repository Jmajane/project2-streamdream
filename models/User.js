const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username cannot be empty'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email cannot be empty'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password cannot be empty']
    },
    avatar: {
        type: String,
        default: "https://www.looper.com/img/gallery/why-aangs-power-in-avatar-the-last-airbender-is-more-terrifying-than-you-think/intro-1616420787.jpg",
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;