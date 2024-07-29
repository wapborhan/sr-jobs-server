const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
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

const singleCompany = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const data = await Company.findOne(query);
  res.send(data);
});

module.exports = {
  createCompany,
  allCompany,
  singleCompany,
};
