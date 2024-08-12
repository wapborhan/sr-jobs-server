const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const asyncWrapper = require("../middlewares/async");
const Jobs = require("../models/Jobs");

const createJobs = asyncWrapper(async (req, res) => {
  const jobData = req.body;
  const create = new Jobs(jobData);
  const result = await create.save();
  res.send(result);
});

const getAllJobs = asyncWrapper(async (req, res) => {
  const result = await Jobs.find({});
  res.send(result);
});

const singleJob = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await Jobs.findOne(query);
  res.send(result);
});

const updateSingleJob = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updateJob = req.body;
  const newJob = {
    $set: {
      picture: updateJob.picture,
      title: updateJob.title,
      categories: updateJob.categories,
      salary: updateJob.salary,
      postingDate: updateJob.postingDate,
      appnumber: updateJob.appnumber,
      deadline: updateJob.deadline,
      descriptoion: updateJob.descriptoion,
    },
  };
  const result = await Jobs.updateOne(filter, newJob, options);
  res.send(result);
});

const deleteJob = asyncWrapper(async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await Jobs.findByIdAndDelete(query);
    res.send(result);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

module.exports = {
  getAllJobs,
  singleJob,
  createJobs,
  updateSingleJob,
  deleteJob,
};
