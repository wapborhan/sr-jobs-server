const { model, Schema } = require("mongoose");

const JobsSchema = new Schema(
  {
    companyInf: {
      _id: { type: String },
      compName: { type: String },
      compLogoUrl: { type: String },
    },
    postedDate: { type: String, required: true },

    title: { type: String, required: true },
    categories: { type: String, required: true },

    vacancy: { type: String, required: true },
    qualification: { type: String, required: true },

    jobType: { type: String, required: true },
    experience: { type: String },
    gender: { type: String, required: true },

    location: { type: String, required: true },
    salaryRange: { type: String, required: true },

    image: { type: String },
    locMapLink: { type: String },

    deadline: { type: String, required: true },
    skillsAbilities: { type: Array },

    educationQualification: { type: String },
    jobsDescription: { type: String },
  },
  { versionKey: false }
);

const Jobs = model("jobs", JobsSchema);

module.exports = Jobs;
