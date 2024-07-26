const asyncWrapper = require("../middlewares/async");
const Company = require("../models/Company");

const createCompany = asyncWrapper(async (req, res) => {
  const companyData = req.body;
  const create = new Company(companyData);
  const result = await create.save();
  res.send("Create result");
});

const allCompany = asyncWrapper(async (req, res) => {
  const data = await Company.find({});
  res.send(data);
});

module.exports = {
  createCompany,
  allCompany,
};
