const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  singleJob,
  createJobs,
  updateSingleJob,
  deleteJob,
  createBookmark,
  companyJobs,
} = require("../controllers/jobs");

router.route("/jobs").get(getAllJobs).post(createJobs);
router.route("/job/:id").get(singleJob).put(updateSingleJob).delete(deleteJob);

router.route("/company-job/:compId").get(companyJobs);
router.route("/bookmark").post(createBookmark);
// router.route("/bookmark/:id").get(singleBookmark);

module.exports = router;
