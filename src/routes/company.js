const express = require("express");
const router = express.Router();
const {
  createCompany,
  allCompany,
  singleCompany,
} = require("../controllers/company");

router.route("/company").post(createCompany).get(allCompany);
router.route("/company/:id").get(singleCompany);

module.exports = router;
