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

const updateCompany = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const comapnyData = req.body;

  const filter = { _id: new ObjectId(id) };

  const options = { upsert: true };

  const updatedData = {
    compLogoUrl: comapnyData?.compLogoUrl,
    compName: comapnyData?.compName,
    compCategories: comapnyData?.compCategories,
    compWebsite: comapnyData?.compWebsite,
    compNumber: comapnyData?.compNumber,
    compEmail: comapnyData?.compEmail,
    compAdress: comapnyData?.compAdress,
    compDetails: comapnyData?.compDetails,
    social: {
      facebok: comapnyData?.social?.facebok,
      linkedin: comapnyData?.social?.linkedin,
      twitter: comapnyData?.social?.twitter,
    },
  };

  const result = await Company.updateOne(filter, updatedData, options);
  res.send(result);
});

const deleteCompany = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const data = await Company.findByIdAndDelete(query);
  res.send(data);
});

module.exports = {
  createCompany,
  allCompany,
  singleCompany,
  deleteCompany,
  updateCompany,
};
