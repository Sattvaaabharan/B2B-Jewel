const Company = require('../models/Company');
const companyService = require('../services/companyService');

exports.registerCompany = async (req, res, next) => {
  try {
    const company = await companyService.registerCompany(req.body);
    res.status(201).json(company);
  } catch (err) {
    next(err);
  }
};

exports.getCompanies = async (req, res, next) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.json(companies);
  } catch (err) {
    next(err);
  }
};


// Register new company
exports.registerCompany = async (req, res) => {
  try {
    const { gstin } = req.body;
    const existing = await Company.findOne({ gstin });
    if (existing) {
      return res.status(400).json({ msg: 'Company with this GSTIN already registered.' });
    }
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all companies (for testing)
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

