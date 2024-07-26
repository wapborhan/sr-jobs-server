const { model, Schema } = require("mongoose");

const JobsSchema = new Schema(
  {
    companyId: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String },
    categories: { type: String, required: true },
    salaryRange: { type: String, required: true },
    vacancy: { type: String, required: true },
    gender: { type: String, required: true },
    experience: { type: String },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    qualification: { type: String, required: true },
    postedDate: { type: String, required: true },
    deadline: { type: String, required: true },
    locMapLink: { type: String },
    skillsAbilities: { type: String },
    educationQualification: { type: String },
    jobsDescription: { type: String },
  },
  { versionKey: false }
);

const Jobs = model("jobs", JobsSchema);

module.exports = Jobs;
