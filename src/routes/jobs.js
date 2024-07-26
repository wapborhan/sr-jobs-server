const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  singleJob,
  createJobs,
  updateSingleJob,
} = require("../controllers/jobs");

router.route("/jobs").get(getAllJobs).post(createJobs);
router.route("/job/:id").get(singleJob).put(updateSingleJob);

module.exports = router;
