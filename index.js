const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 3300;

// Middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_NAMEUSER}:${process.env.DB_PASSCODE}@cluster0.7dbji.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const dbJobs = client.db("jobsDB").collection("jobs");
    const dbapplied = client.db("jobsDB").collection("applied");

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

    app.get("/applied", async (req, res) => {
      const result = await dbapplied.find().toArray();
      res.send(result);
    });

    app.post("/applied", async (req, res) => {
      const job = req.body;
      const result = await dbapplied.insertOne(job);
      res.send(result);
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

app.get("/", async (req, res) => {
  console.log("Server Start");
});

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
