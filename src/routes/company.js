const express = require("express");
const router = express.Router();
const { createCompany, allCompany } = require("../controllers/company");

router.route("/company").post(createCompany).get(allCompany);

module.exports = router;
