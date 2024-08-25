const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const asyncWrapper = require("../middlewares/async");
const Jobs = require("../models/Jobs");
const Bookmark = require("../models/Bookmark");

const createJobs = asyncWrapper(async (req, res) => {
  const jobData = req.body;
  const create = new Jobs(jobData);
  const result = await create.save();
  res.send(result);
});

const getAllJobs = asyncWrapper(async (req, res) => {
  try {
    const categories = req.query.cat;
    const searchText = req.query.text;

    if (categories === "all") {
      const result = await Jobs.find({});

      res.send(result);
    } else {
      let filter = {};

      if (categories && categories !== "all") {
        filter.categories = categories;
      }

      if (searchText) {
        filter.title = { $regex: searchText, $options: "i" };
      }

      const result = await Jobs.find(filter);
      res.send(result);
    }
  } catch (error) {
    res.status(500).send({ error: "Something went wrong!" });
  }
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

const createBookmark = asyncWrapper(async (req, res) => {
  try {
    const bookmarkData = req.body;
    const create = new Bookmark(bookmarkData);
    const result = await create.save();
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
  createBookmark,
};
