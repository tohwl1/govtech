//routes

const express = require("express");
const router = express.Router();
const csvController = require("../controllers/csv.controller");
const upload = require("../middlewares/upload");

let routes = (app) => {
  router.post("/users/upload", upload.single("file"), csvController.upload);
  router.get("/users", csvController.getcsvs);
  app.use("", router);
};

module.exports = routes;
