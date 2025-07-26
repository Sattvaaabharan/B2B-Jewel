const express = require('express');
const Company = require('../models/Company');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { gstin } = req.body;
    const existing = await Company.findOne({ gstin });
    if (existing) return res.status(400).json({ msg: "Company with this GSTIN already registered." });

    const company = new Company(req.body);
    await company.save();
    return res.status(201).json(company);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
