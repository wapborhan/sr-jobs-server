const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String },
    email: { type: String, required: true },
    name: { type: String },
    photoUrl: { type: String },
    accountType: { type: String, required: true },
    companyName: { type: String },
    address: { type: String },
    bio: { type: String },
    socialLinks: {
      facebook: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      github: { type: String },
    },
    userType: { type: String },
  },
  { versionKey: false }
);

const Users = model("users", UserSchema);

module.exports = Users;
