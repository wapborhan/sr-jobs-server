const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUsers,
  getSingleUser,
  editSingleUser,
} = require("../controllers/users");

router.route("/users").get(getAllUsers).post(createUsers);
router.route("/user/:username").get(getSingleUser).put(editSingleUser);

module.exports = router;
