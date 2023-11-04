const express = require("express");
const cors = require("cors");
const app = express();
const port = 3300;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  console.log("Server Start");
});

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
