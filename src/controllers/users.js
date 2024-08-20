const asyncWrapper = require("../middlewares/async");
const Users = require("../models/Users");

// Get Request
const getAllUsers = asyncWrapper(async (req, res) => {
  const result = await Users.find({});
  res.send(result);
});

const getSingleUser = asyncWrapper(async (req, res) => {
  try {
    const { data } = req.query;

    // Decode the Base64 email
    const decodedEmail = Buffer.from(data, "base64").toString("utf-8");

    const filter = { email: decodedEmail };
    const result = await Users.findOne(filter);

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
  try {
    const { data } = req.query;
    const userData = req.body;

    // Decode the Base64 email
    const decodedEmail = Buffer.from(data, "base64").toString("utf-8");
    const filter = { email: decodedEmail };

    updatedData = {
      email: userData?.email,
      name: userData?.name,
      photoUrl: userData?.photoUrl,
      accountType: userData?.accountType,
      companyName: userData?.companyName,
      address: userData?.address,
      bio: userData?.bio,
      socialLinks: {
        facebook: userData?.socialLinks.facebook,
        twitter: userData?.socialLinks.twitter,
        linkedin: userData?.socialLinks.linkedin,
        github: userData?.socialLinks.github,
      },
      userType: userData?.userType,
    };

    // Find the user by username and update their links field
    const updatedUser = await Users.findOneAndUpdate(filter, updatedData, {
      new: true, // Return the updated document
    });
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
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
