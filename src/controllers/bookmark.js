const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const asyncWrapper = require("../middlewares/async");
const Jobs = require("../models/Jobs");
const Bookmark = require("../models/Bookmark");

// Create a new bookmark
const createBookmark = asyncWrapper(async (req, res) => {
  try {
    const { jobId, bookmarkerEmail } = req.body;
    if (!jobId || !bookmarkerEmail) {
      return res
        .status(400)
        .json({ error: "Job ID and User Email are required." });
    }

    // Check if the bookmark already exists for this user and job
    const existingBookmark = await Bookmark.findOne({ jobId, bookmarkerEmail });
    if (existingBookmark) {
      return res
        .status(400)
        .json({ error: "Bookmark already exists for this job and user." });
    }

    // Create a new bookmark
    const newBookmark = new Bookmark(req.body);
    const result = await newBookmark.save();

    res.status(200).json({ message: "Bookmarked successfully.", data: result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the bookmark." });
  }
});

// Get all bookmarks for a specific user or all users
const allBookmark = asyncWrapper(async (req, res, next) => {
  const { email } = req.query;
  let result;

  try {
    if (email === "all") {
      result = await Bookmark.find({}).populate("jobId"); // Populate with job details if needed
    } else {
      result = await Bookmark.find({ bookmarkerEmail: email }).populate(
        "jobId"
      ); // Populate with job details if needed
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the error-handling middleware
  }
});

// Delete a bookmark for a specific job and user
const deleteBookmark = asyncWrapper(async (req, res) => {
  const { jobId } = req.params;
  const email = req.query.email; // Get user email from request body

  if (!jobId || !email) {
    return res
      .status(400)
      .json({ error: "Job ID and User Email are required." });
  }

  // Find and delete the bookmark for the specific job and user
  const bookmark = await Bookmark.findOneAndDelete({
    jobId,
    bookmarkerEmail: email,
  });

  if (!bookmark) {
    return res
      .status(404)
      .json({ error: "Bookmark not found for this user and job." });
  }

  res.status(200).json({ message: "Bookmark deleted successfully." });
});

module.exports = {
  createBookmark,
  allBookmark,
  deleteBookmark,
};
