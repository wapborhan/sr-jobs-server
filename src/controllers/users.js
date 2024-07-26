const asyncWrapper = require("../middlewares/async");
const Users = require("../models/Users");

// Get Request
const getAllUsers = asyncWrapper(async (req, res) => {
  const result = await Users.find({});
  res.send(result);
});

const getSingleUser = asyncWrapper(async (req, res) => {
  const { username } = req.params;
  const filter = { username: username };
  const result = await Users.findOne(filter);
  res.status(200).json(result);
});

// Post Request

const createUsers = asyncWrapper(async (req, res) => {
  try {
    const userData = req.body;

    // Check if the username is provided in the request body
    if (!userData || !userData.username) {
      return res.status(400).json({ error: "Username is required" });
    }

    // Check if the username already exists in the database
    const existingUser = await Users.findOne({ username: userData.username });

    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // If the username doesn't exist, create a new user
    const newUser = await Users.create(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const editSingleUser = asyncWrapper(async (req, res) => {
  const username = req.params.username;
  const newLinks = req.body.links;
  const newBio = req.body.bio;
  const newAddress = req.body.address;

  try {
    // Find the user by username and update their links field
    const updatedUser = await Users.findOneAndUpdate(
      { username: username },
      { links: newLinks, bio: newBio, address: newAddress }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    // res.status(200).send(updatedUser);
    res.status(200).send({ message: "Profile Updated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = {
  getAllUsers,
  getSingleUser,
  createUsers,
  editSingleUser,
};
