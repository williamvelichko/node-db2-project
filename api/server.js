const express = require("express");
const carRouter = require("./cars/cars-router");
const server = express();
server.use(express.json());

// DO YOUR MAGIC
server.use("/api/cars", carRouter);
server.use("/", (req, res) => {
  console.log("working");
});

module.exports = server;
