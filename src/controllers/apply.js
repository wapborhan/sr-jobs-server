const asyncWrapper = require("../middlewares/async");
const Apply = require("../models/Apply");

const createApplyJob = asyncWrapper(async (req, res) => {
  try {
    const applyData = req.body;
    const { applierInf, jobInf } = applyData;
    // Second apply Stop
    const existingBookmark = await Apply.findOne({ applierInf, jobInf });
    if (existingBookmark) {
      return res.status(400).json({ message: "You Are Already Applied." });
    }
    // Save Database
    const create = new Apply(applyData);
    const result = await create.save();
    res.status(200).json({ message: "Succesfully Applied.", data: result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the bookmark." });
  }
});

const allJobApllication = asyncWrapper(async (req, res, next) => {
  const { id } = req.query;
  let result;
  try {
    if (id === "all") {
      result = await Apply.find({}).populate("applierInf").populate("jobInf");
    } else {
      result = await Apply.find({ applierInf: id })
        .populate("applierInf")
        .populate("jobInf");
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = { createApplyJob, allJobApllication };
