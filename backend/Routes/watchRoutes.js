const express = require('express');
const router = express.Router();
const Watch = require('../Models/Watch');






router.get('/products/all', async (req, res) => {
  try {
    const allWatches = await Watch.find()
      .sort({ createdAt: -1 }) // Sort by newest first

    res.status(200).json(allWatches);
  } catch (error) {
    console.error('Error fetching all watches:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching watches',
      error: error.message,
    });
  }
});




// Get new arrivals


module.exports = router;