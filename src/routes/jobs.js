const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  singleJob,
  createJobs,
  updateSingleJob,
  deleteJob,
  companyJobs,
  myJobs,
} = require("../controllers/jobs");
const {
  createBookmark,
  allBookmark,
  deleteBookmark,
} = require("../controllers/bookmark");
const { createApplyJob, allJobApllication } = require("../controllers/apply");

router.route("/jobs").get(getAllJobs).post(createJobs).get(myJobs);
router.route("/my-jobs").get(myJobs);
router.route("/job/:id").get(singleJob).put(updateSingleJob).delete(deleteJob);

router.route("/company-job/:compId").get(companyJobs);
router.route("/bookmark").post(createBookmark).get(allBookmark);
router.route("/bookmark/:jobId").delete(deleteBookmark);

router.route("/apply").post(createApplyJob).get(allJobApllication);

module.exports = router;
