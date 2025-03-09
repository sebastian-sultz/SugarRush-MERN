const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: 'https://res.cloudinary.com/demo/image/upload/v1630000000/default_music.jpg'
  },
  artist: {
    type: String,
    default: 'Unknown Artist'
  }
}, { timestamps: true });

module.exports = mongoose.model('Music', musicSchema);