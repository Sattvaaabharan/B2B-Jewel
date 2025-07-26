const companyService = require('./companyService');

exports.listPendingCompanies = async () => {
  return companyService.getPendingVerifications();
};

exports.approveCompany = async (companyId) => {
  return companyService.verifyCompany(companyId);
};

exports.rejectCompany = async (companyId) => {
  return companyService.rejectCompany(companyId);
};
