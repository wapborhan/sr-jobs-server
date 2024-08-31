const { model, Schema } = require("mongoose");

const JobsSchema = new Schema(
  {
    companyInf: {
      _id: { type: String },
      compName: { type: String },
      compLogoUrl: { type: String },
    },
    userEmail: {
      type: String,
      required: function () {
        return this.isNew;
      },
    },
    postedDate: { type: String },

    title: { type: String },
    categories: { type: String },

    workplaceType: { type: String },
    jobType: { type: String },
    experience: { type: String },
    gender: { type: String },

    location: { type: String },
    salaryRange: { type: String },

    deadline: { type: String },
    skillsAbilities: { type: Array },

    jobsDescription: { type: String },
  },
  { versionKey: false }
);

const Jobs = model("jobs", JobsSchema);

module.exports = Jobs;
