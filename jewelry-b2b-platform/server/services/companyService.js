const Company = require('../models/Company');

exports.registerCompany = async (data) => {
  const exists = await Company.findOne({ gstin: data.gstin });
  if (exists) throw new Error('Company with this GSTIN already exists');
  const company = new Company(data);
  await company.save();
  return company;
};

exports.getAllCompanies = async () => {
  return Company.find();
};

exports.getPendingVerifications = async () => {
  return Company.find({ isVerified: false });
};

exports.verifyCompany = async (id) => {
  const company = await Company.findById(id);
  if (!company) throw new Error('Company not found');
  company.isVerified = true;
  await company.save();
  return company;
};

exports.rejectCompany = async (id) => {
  const company = await Company.findById(id);
  if (!company) throw new Error('Company not found');
  await company.remove();
  return true;
};
