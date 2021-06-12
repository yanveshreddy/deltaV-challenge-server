const express = require("express");

const apiController = require("../controllers/apiController");

// const auth = require("./../middlewares/auth");
module.exports.setRouter = (app) => {
  app.post("/api/createuser", apiController.createTreeFormData);
  app.get("/api/getparentdata", apiController.getParentData);
};
