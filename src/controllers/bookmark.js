const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const asyncWrapper = require("../middlewares/async");
const Jobs = require("../models/Jobs");
const Bookmark = require("../models/Bookmark");

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

    res.status(200).json({ message: "Bookmarked." });
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

  res.status(200).json({ message: "Bookmark Deleted." });
});

module.exports = {
  createBookmark,
  allBookmark,
  deleteBookmark,
};
