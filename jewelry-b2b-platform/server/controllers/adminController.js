const adminService = require('../services/adminService');

exports.listPending = async (req, res, next) => {
  try {
    const pendingCompanies = await adminService.listPendingCompanies();
    res.json(pendingCompanies);
  } catch (err) {
    next(err);
  }
};

exports.approveCompany = async (req, res, next) => {
  try {
    const company = await adminService.approveCompany(req.params.companyId);
    res.json({ message: 'Company verified', company });
  } catch (err) {
    next(err);
  }
};

exports.rejectCompany = async (req, res, next) => {
  try {
    await adminService.rejectCompany(req.params.companyId);
    res.json({ message: 'Company rejected and removed' });
  } catch (err) {
    next(err);
  }
};
