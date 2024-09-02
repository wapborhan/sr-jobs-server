const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const notFound = require("./middlewares/not-found");
const applyMiddlewares = require("./middlewares");
const user = require("./routes/user");
const jobs = require("./routes/jobs");
const company = require("./routes/company");
const globalErrorHandler = require("./utils/globalErrorHandler");

app.use(express.static(path.join(__dirname, "public")));

// midlewares
applyMiddlewares(app);

//  All Routes
app.use(company);
app.use(jobs);
app.use(user);

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = 404;
  next(error);
});

// error handling middleware
app.use(globalErrorHandler);

// Not found
app.use(notFound);

module.exports = app;
