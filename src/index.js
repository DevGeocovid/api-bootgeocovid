const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const server = express();

const scheduler = require("./services/scheduler");
const { RecurrenceJob } = scheduler;

const InformationPage = require("./services/InformationPage");

//dotenv
require("dotenv").config();

const port = process.env.PORT;

mongoose.connect(process.env.URL_CONNECT_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

server.use(cors());
server.use(express.json());
server.use(routes);
server.listen(port); //porta backend

server.disable("x-powered-by");

async function getInformationsPage() {
  try {
    await InformationPage.robo();
  } catch (e) {
    console.log("❌ Dados indisponíveis na página!\n");
  }
}

const job = new RecurrenceJob()
  .executeJob("getInformationsPage", getInformationsPage)
  .every(1)
  .day()
  .hour(15)
  .minute(47);

scheduler.newJob(job);
