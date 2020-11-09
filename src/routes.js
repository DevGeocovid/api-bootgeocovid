const express = require("express");
const InformationController = require("./controllers/InformationController");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Tudo ok!😎" });
});
routes.get("/information", InformationController.index);
routes.get("/information/last", InformationController.last);

module.exports = routes;
