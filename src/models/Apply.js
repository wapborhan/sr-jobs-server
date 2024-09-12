const { model, Schema, mongoose } = require("mongoose");

const ApplySchema = new Schema(
  {
    applierInf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    jobInf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
    },
    expectedSalary: { type: String },
    currentSalary: { type: String },
    agree: { type: String },
  },
  { versionKey: false }
);

const Apply = model("applieds", ApplySchema);

module.exports = Apply;
