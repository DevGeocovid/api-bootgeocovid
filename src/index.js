require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const server = express();

const scheduler = require("./services/scheduler");
const { RecurrenceJob } = scheduler;

const InformationPage = require("./business/InformationPage");
// const email = require("./services/email");

//dotenv

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
      // email.send({ type: "success" });
  } catch (e) {
    console.log("❌ Dados indisponíveis na página!\n");
    console.log("Error:\n", e);
    // email.send({ type: "error", e });
  }
}

const job = new RecurrenceJob()
  .executeJob("getInformationsPage", getInformationsPage)
  .every(1)
  .day()
  .hour(process.env.HOUR)
  .minute(process.env.MINUTE);

scheduler.newJob(job);
