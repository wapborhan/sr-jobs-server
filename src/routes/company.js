const express = require("express");
const router = express.Router();
const {
  createCompany,
  allCompany,
  singleCompany,
  deleteCompany,
  updateCompany,
} = require("../controllers/company");

router.route("/company").post(createCompany).get(allCompany);
router
  .route("/company/:id")
  .get(singleCompany)
  .put(updateCompany)
  .delete(deleteCompany);

module.exports = router;
