const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  gstin: { type: String, required: true, unique: true },
  pan: { type: String, required: true, unique: true },
  udyam: { type: String, default: '' },
  iec: { type: String, default: '' },
  bisLicense: { type: String, default: '' },
  bankDetails: {
    accountNumber: { type: String, default: '' },
    ifsc: { type: String, default: '' },
    bankName: { type: String, default: '' },
  },
  documents: [{ type: String }], // S3 URLs
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Company', CompanySchema);
