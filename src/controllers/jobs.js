const asyncWrapper = require("../middlewares/async");
const Jobs = require("../models/Jobs");

const createJobs = asyncWrapper(async (req, res) => {
  const job = req.body;
  const result = await Jobs.insertOne(job);
  res.send("Create result");
});

const getAllJobs = asyncWrapper(async (req, res) => {
  const result = await Jobs.find({});
  res.send(result);
});

const singleJob = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await Jobs.findOne(query);
  res.send("result 1");
});

const updateSingleJob = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updateJob = req.body;
  const newJob = {
    $set: {
      picture: updateJob.picture,
      title: updateJob.title,
      categories: updateJob.categories,
      salary: updateJob.salary,
      postingDate: updateJob.postingDate,
      appnumber: updateJob.appnumber,
      deadline: updateJob.deadline,
      descriptoion: updateJob.descriptoion,
    },
  };
  const result = await Jobs.updateOne(filter, newJob, options);
  res.send(result);
});

// app.get("/applied", async (req, res) => {
//   //

//   let query = {};
//   if (req.query?.email) {
//     query = { email: req.query.email };
//   }
//   const result = await dbapplied.find(query).toArray();
//   res.send(result);
// });

// app.get("/applied/:id", async (req, res) => {
//   const id = req.params.id;
//   const query = { _id: new ObjectId(id) };
//   const result = await dbapplied.findOne(query);
//   res.send(result);
// });

// app.post("/applied", async (req, res) => {
//   const job = req.body;
//   const result = await dbapplied.insertOne(job);
//   res.send(result);
// });

// app.get("/myjobs", async (req, res) => {
//   let query = {};
//   if (req.query?.email) {
//     query = { email: req.query.email };
//   }
//   const result = await dbJobs.find(query).toArray();
//   res.send(result);
// });

// app.delete("/myjobs/:id", async (req, res) => {
//   const id = req.params.id;
//   const query = { _id: new ObjectId(id) };
//   const result = await dbJobs.deleteOne(query);
//   res.send(result);
// });

module.exports = {
  getAllJobs,
  singleJob,
  createJobs,
  updateSingleJob,
};
