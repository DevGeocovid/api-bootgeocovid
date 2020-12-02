const express = require("express");
const InformationController = require("./controllers/InformationController");
const MonthMapsController = require("./controllers/MonthMapsController");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Tudo ok!😎" });
});
routes.get("/information", InformationController.index);
routes.get("/information/last", InformationController.last);

routes.post("/month-map/create", MonthMapsController.create);
routes.get("/month-map", MonthMapsController.index);

module.exports = routes;
