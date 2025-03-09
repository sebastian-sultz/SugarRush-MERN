const express = require('express');
const router = express.Router();
const Service = require('../Models/servicesModel');

// @route GET /services
// @desc Fetch all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services' });
  }
});

// @route POST /services
// @desc Add a new service
router.post('/', async (req, res) => {
  const { name, description, bgColor, textColor } = req.body;

  if (!name || !description || !bgColor || !textColor) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newService = new Service({ name, description, bgColor, textColor });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Error adding service' });
  }
});

module.exports = router;
