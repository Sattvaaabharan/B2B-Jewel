const companyService = require('../services/companyService');
const authService = require('../services/authService');

exports.register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: 'User registered', userId: user._id });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.loginUser(email, password);
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};


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
