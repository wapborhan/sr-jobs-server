const express = require("express");
require("dotenv").config();
const cors = require("cors");
var jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3300;

// Middleware
app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieparser());

// MongoDB
const uri = `mongodb+srv://srjobs:aoxOIWgdlHQjEE3g@cluster0.7dbji.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_NAMEUSER}:${process.env.DB_PASSCODE}@cluster0.7dbji.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "Not authorized " });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "authorized " });
    }
    req.user = decoded;
    next();
  });
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const dbJobs = client.db("jobsDB").collection("jobs");
    const dbapplied = client.db("jobsDB").collection("applied");

    app.get("/", async (req, res) => {
      res.send("Server Start");
    });

    app.post("/auth", async (req, res) => {
      const user = req.body;
      // console.log(user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      // console.log(token);
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
        })
        .send({ success: true });
    });

    app.get("/jobs", async (req, res) => {
      const result = await dbJobs.find().toArray();
      res.send(result);
    });

    app.get("/jobs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await dbJobs.findOne(query);
      res.send(result);
    });

    app.post("/jobs", async (req, res) => {
      const job = req.body;
      const result = await dbJobs.insertOne(job);
      res.send(result);
    });

    app.put("/jobs/:id", async (req, res) => {
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
      const result = await dbJobs.updateOne(filter, newJob, options);
      res.send(result);
    });

    app.get("/applied", verifyToken, async (req, res) => {
      //

      if (req.query.email !== req.user.email) {
        return res.status(403).send({ message: "Forbidden" });
      }

      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email };
      }
      const result = await dbapplied.find(query).toArray();
      res.send(result);
    });

    app.get("/applied/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await dbapplied.findOne(query);
      res.send(result);
    });

    app.post("/applied", async (req, res) => {
      const job = req.body;
      const result = await dbapplied.insertOne(job);
      res.send(result);
    });

    app.get("/myjobs", verifyToken, async (req, res) => {
      if (req.query.email !== req.user.email) {
        return res.status(403).send({ message: "Forbidden" });
      }
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email };
      }
      const result = await dbJobs.find(query).toArray();
      res.send(result);
    });

    app.delete("/myjobs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await dbJobs.deleteOne(query);
      res.send(result);
    });

    app.post("/logout", async (req, res) => {
      const user = req.body;
      res.clearCookie("token", { maxAge: 0 }).send({ success: true });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
