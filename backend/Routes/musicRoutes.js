const express = require('express');
const router = express.Router();
const Music = require('../Models/Music');

// Get all music tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Music.find().sort({ createdAt: -1 });
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching music' });
  }
});

module.exports = router;