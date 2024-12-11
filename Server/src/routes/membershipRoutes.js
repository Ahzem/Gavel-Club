const express = require('express');
const router = express.Router();
const { validateAdmin } = require('../middleware/auth');
const MembershipConfig = require('../models/MembershipConfig');

// Validate membership configuration
const validateConfig = (req, res, next) => {
  const { formUrl, closeDate } = req.body;
  
  if (!formUrl) {
    return res.status(400).json({ message: 'Form URL is required' });
  }
  
  if (!closeDate) {
    return res.status(400).json({ message: 'Closing date is required' });
  }
  
  next();
};

// Get current membership configuration
router.get('/config', async (req, res) => {
  try {
    const config = await MembershipConfig.findOne().sort({ createdAt: -1 });
    res.json(config || { isOpen: true, formUrl: '', closeDate: new Date() });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch configuration' });
  }
});

// Update membership configuration (admin only)
router.post('/config', [validateAdmin, validateConfig], async (req, res) => {
  try {
    const { isOpen, formUrl, closeDate } = req.body;

    const config = await MembershipConfig.findOneAndUpdate(
      {}, 
      { isOpen, formUrl, closeDate },
      { new: true, upsert: true }
    );

    res.json(config);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update configuration' });
  }
});

module.exports = router;