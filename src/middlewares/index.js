const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const applyMiddlewares = (app) => {
  app.use(
    cors({
      origin: [process.env.LOCAL_CLIENT, process.env.CLIENT],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
};
module.exports = applyMiddlewares;
