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
      title: updateJob?.title,
      categories: updateJob?.categories,
      workplaceType: updateJob?.workplaceType,
      jobType: updateJob?.jobType,
      experience: updateJob?.experience,
      gender: updateJob?.gender,
      location: updateJob?.location,
      salaryRange: updateJob?.salaryRange,
      deadline: updateJob?.deadline,
      skillsAbilities: updateJob?.skillsAbilities,
      jobsDescription: updateJob?.jobsDescriptions,
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

const companyJobs = asyncWrapper(async (req, res) => {
  try {
    const { compId } = req.params;
    const filter = { "companyInf._id": compId };

    const result = await Jobs.find(filter);

    res.send(result);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const myJobs = asyncWrapper(async (req, res) => {
  try {
    const email = req.query.email;
    const filter = { userEmail: email };
    const result = await Jobs.find(filter);
    res.send(result);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const createBookmark = asyncWrapper(async (req, res) => {
  try {
    const { jobId, userEmail } = req.body;
    if (!jobId || !userEmail) {
      return res
        .status(400)
        .json({ error: "Job ID and User Email are required." });
    }

    const existingBookmark = await Bookmark.findOne({ jobId, userEmail });
    if (existingBookmark) {
      return res
        .status(400)
        .json({ error: "Bookmark already exists for this job and user." });
    }

    const newBookmark = new Bookmark(req.body);
    const result = await newBookmark.save();

    res.status(200).json({ message: "Bookmark created successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the bookmark." });
  }
});

const allBookmark = asyncWrapper(async (req, res) => {
  try {
    const result = await Bookmark.find({});
    res.send(result);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const deleteBookmark = asyncWrapper(async (req, res) => {
  const { jobId } = req.params;

  if (!jobId) {
    return res
      .status(400)
      .json({ error: "Job ID and User Email are required." });
  }

  const bookmark = await Bookmark.findOneAndDelete({ jobId });

  if (!bookmark) {
    return res.status(404).json({ error: "Bookmark not found." });
  }

  res.status(200).json({ message: "Bookmark deleted successfully." });
});

module.exports = {
  getAllJobs,
  singleJob,
  createJobs,
  updateSingleJob,
  deleteJob,
  createBookmark,
  companyJobs,
  myJobs,
  allBookmark,
  deleteBookmark,
};
